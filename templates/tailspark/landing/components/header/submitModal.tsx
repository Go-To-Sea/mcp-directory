"use client";

// 添加 useRouter 导入
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { v4 as uuidv4 } from 'uuid';
import { insertProject } from "@/models/project";
import { useRouter } from 'next/navigation' // 添加路由导入
import { useAuth, SignInButton } from '@clerk/nextjs' // 添加 Clerk 的 auth 钩子和登录按钮

// 自定义Toast组件
const Toast = ({ message, description, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`fixed top-4 right-4 z-50 rounded-lg shadow-md p-3 max-w-[90vw] w-auto sm:w-[320px] 
        ${type === 'success' 
          ? 'bg-white dark:bg-gray-800 border-l-4 border-blue-500' 
          : 'bg-white dark:bg-gray-800 border-l-4 border-purple-600'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`mr-2 mt-0.5 ${
            type === 'success' ? 'text-blue-500' : 'text-purple-600'
          }`}>
            {type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-800 dark:text-gray-100">{message}</h3>
            {description && <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">{description}</p>}
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ml-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

// 修改 formSchema，添加 type 字段
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  githubUrl: z.string().url("Please enter a valid URL").regex(/^https:\/\/github\.com\//, "GitHub URL must start with https://github.com/"),
  type: z.enum(["server", "client"]), // 添加类型选择
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastInfo, setToastInfo] = useState(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); // 添加登录弹窗状态
  const router = useRouter(); // 添加路由钩子
  const { isSignedIn } = useAuth(); // 使用 Clerk 的 useAuth 钩子检查登录状态
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubUrl: "",
      type: "server", // 默认为server类型
    },
  });
  
  // 获取当前选择的类型
  const selectedType = form.watch("type");
  
  const showToast = (message, description, type) => {
    setToastInfo({ message, description, type });
    
    // 3秒后自动关闭
    setTimeout(() => {
      setToastInfo(null);
    }, 3000);
  };
  
  // 添加处理提交按钮点击的函数
  const handleSubmitClick = () => {
    if (!isSignedIn) {
      // 如果用户未登录，显示登录提示弹窗
      setIsLoginDialogOpen(true);
    } else {
      // 用户已登录，打开提交表单弹窗
      setIsDialogOpen(true);
    }
  };
  
  const onSubmit = async (values: FormValues) => {
      try {
        setIsSubmitting(true);
        
        // 不再添加随机后缀
        const projectData = {
          uuid: uuidv4(),
          name: values.name,
          title: values.name,
          description: values.description,
          url: values.githubUrl,
          type: values.type, // 使用表单中选择的类型
          status: 'created',
          tags: `mcp,${values.type}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // 插入项目数据
        const result = await insertProject(projectData);
        
        // 先关闭弹窗
        setIsDialogOpen(false);
        form.reset();
        
        // 显示成功提示
        showToast("Success", `Your MCP ${values.type === 'server' ? 'Server' : 'Client'} has been submitted!`, "success");
        
        // 延迟一小段时间后跳转到详情页
        setTimeout(() => {
          const detailPath = `/project/${encodeURIComponent(values.name)}`;
          router.push(detailPath);
        }, 500);
        
      } catch (error) {
        
        // 检查是否是唯一约束错误
        if (error.code === '23505' && error.message?.includes('projects_name_key')) {
          // 项目名称已存在错误
          showToast("Failed", `项目名称 "${form.getValues().name}" 已存在，请使用其他名称`, "error");
          // 聚焦到名称输入框
          form.setError('name', { 
            type: 'manual', 
            message: '项目名称已存在，请使用其他名称' 
          });
        } else {
          // 其他错误
          showToast("Failed", "提交失败，请稍后重试", "error");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <>
      {/* 自定义Toast显示 */}
      <AnimatePresence>
        {toastInfo && (
          <Toast
            message={toastInfo.message}
            description={toastInfo.description}
            type={toastInfo.type}
            onClose={() => setToastInfo(null)}
          />
        )}
      </AnimatePresence>
      
      {/* 提交按钮 */}
      <Button
        variant="default"
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 shadow-md hover:shadow-lg rounded-full px-6"
        onClick={handleSubmitClick}
      >
        Submit
      </Button>

      {/* 登录提示弹窗 */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-[400px] !rounded-2xl border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              登录提示
            </DialogTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              您需要先登录才能提交项目
            </p>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-6 flex flex-col items-center">
              <motion.div 
                className="w-full flex justify-center mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </motion.div>
              <motion.div 
                className="flex justify-center space-x-3 pt-4 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  onClick={() => setIsLoginDialogOpen(false)}
                  type="button"
                  className="!rounded border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
                >
                  取消
                </Button>
                <SignInButton mode="modal">
                  <Button 
                    type="button"
                    className="!rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all"
                    onClick={() => setIsLoginDialogOpen(false)}
                  >
                    立即登录
                  </Button>
                </SignInButton>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* 项目提交弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px] !rounded-2xl border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Submit Your MCP {selectedType === 'server' ? 'Server' : 'Client'}
            </DialogTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Share your MCP {selectedType === 'server' ? 'server' : 'client'} with the world.
            </p>
          </DialogHeader>
          <div className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* 添加类型选择字段 */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Project Type</FormLabel>
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant={field.value === 'server' ? 'default' : 'outline'}
                            className={`flex-1 !rounded ${
                              field.value === 'server' 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                                : 'border-gray-300 dark:border-gray-700'
                            }`}
                            onClick={() => field.onChange('server')}
                          >
                            Server
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === 'client' ? 'default' : 'outline'}
                            className={`flex-1 !rounded ${
                              field.value === 'client' 
                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                                : 'border-gray-300 dark:border-gray-700'
                            }`}
                            onClick={() => field.onChange('client')}
                          >
                            Client
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                {/* 项目名称字段 */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Project Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter project name" 
                            className="!rounded border-gray-300 dark:border-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500 transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your project" 
                            className="!rounded resize-none min-h-[100px] border-gray-300 dark:border-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500 transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">GitHub URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://github.com/username/repo" 
                            className="!rounded border-gray-300 dark:border-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500 transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="pt-2"
                >
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full !rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        提交中...
                      </div>
                    ) : (
                      '提交项目'
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}