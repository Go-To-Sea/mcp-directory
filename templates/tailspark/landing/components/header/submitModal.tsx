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
  const router = useRouter(); // 添加路由钩子
  
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
      }, 1500);
      
    } catch (error) {
      console.error('Submission error:', error);
      
      // 显示错误提示
      showToast("Failed", "Submission failed, please try again later.", "error");
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
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 shadow-md hover:shadow-lg rounded-full px-6"
        >
          Submit
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {isDialogOpen && (
          <DialogContent className="sm:max-w-[450px] !rounded-2xl border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
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
                      transition={{ delay: 0.2 }}
                    >
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300">Project Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter project description" 
                                className="!rounded min-h-[120px] border-gray-300 dark:border-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500 transition-all" 
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
                      transition={{ delay: 0.3 }}
                    >
                      <FormField
                        control={form.control}
                        name="githubUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300">GitHub URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://github.com/your-username/your-repo" 
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
                      className="flex justify-end space-x-3 pt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        type="button"
                        className="!rounded border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="!rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all"
                      >
                        Submit {selectedType === 'server' ? 'Server' : 'Client'}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
    </>
  );
}