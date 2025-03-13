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
import { insertProject,findMaxSort } from "@/models/project";
import { usePathname, useRouter } from "next/navigation";
import Projects from "../projects/index"

import { useAuth, SignInButton } from '@clerk/nextjs' // 添加 Clerk 的 auth 钩子和登录按钮

// 自定义Toast组件
// Toast组件的属性接口定义
interface ToastProps {
  message: string;  // Toast消息内容
  description?: string;  // 可选的详细描述
  type: 'success' | 'error';  // Toast类型，只能是success或error
  onClose: () => void;  // 关闭Toast的回调函数
}


const Toast = ({ message, description, type, onClose }: ToastProps) => {
  
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
  // name: z.string().min(2, "Name must be at least 2 characters"),
  // description: z.string().min(10, "Description must be at least 10 characters"),
  githubUrl: z.string().url("Please enter a valid URL").regex(/^https:\/\/github\.com\//, "GitHub URL must start with https://github.com/"),
  type: z.enum(["server", "client"]), // 添加类型选择
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitForm({
  projects,
}: {
  projects: any
}){
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastInfo, setToastInfo] = useState<ToastProps | null>(null);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUrl: "",
      type: "server",
    },
  });
  
  const selectedType = form.watch("type");
  
  const showToast = (message: string, description: string, type: 'success' | 'error') => {
    setToastInfo({ message, description, type, onClose: () => setToastInfo(null) });
    
    // 3秒后自动关闭
    setTimeout(() => {
      setToastInfo(null);
    }, 3000);
  };
  
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/get-project?type=${encodeURIComponent(values.type)}&url=${encodeURIComponent(values.githubUrl)}`);
      // ... 其他提交逻辑保持不变 ...
    } catch (error) {
      // ... 错误处理保持不变 ...
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClick = (e: React.MouseEvent) => {
   
    router.push('/submit');
  };

  return (
    <>
    <div className="fixed inset-0 w-full flex justify-center">
        <div className="w-full max-w-[1920px]">
          {/* 保持原有的背景 SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" className="-z-50 absolute hidden opacity-25 [mask-image:linear-gradient(to_right,white,transparent,transparent,white)] lg:block"><g clipPath="url(#clip0_4_5)"><rect width="1920" height="1080"></rect><line y1="49.5" x2="1920" y2="49.5" className="stroke-muted-foreground"></line><line y1="99.5" x2="1920" y2="99.5" className="stroke-muted-foreground"></line><line y1="149.5" x2="1920" y2="149.5" className="stroke-muted-foreground"></line><line y1="199.5" x2="1920" y2="199.5" className="stroke-muted-foreground"></line><line y1="249.5" x2="1920" y2="249.5" className="stroke-muted-foreground"></line><line y1="299.5" x2="1920" y2="299.5" className="stroke-muted-foreground"></line><line y1="349.5" x2="1920" y2="349.5" className="stroke-muted-foreground"></line><line y1="399.5" x2="1920" y2="399.5" className="stroke-muted-foreground"></line><line y1="449.5" x2="1920" y2="449.5" className="stroke-muted-foreground"></line><line y1="499.5" x2="1920" y2="499.5" className="stroke-muted-foreground"></line><line y1="549.5" x2="1920" y2="549.5" className="stroke-muted-foreground"></line><line y1="599.5" x2="1920" y2="599.5" className="stroke-muted-foreground"></line><line y1="649.5" x2="1920" y2="649.5" className="stroke-muted-foreground"></line><line y1="699.5" x2="1920" y2="699.5" className="stroke-muted-foreground"></line><line y1="749.5" x2="1920" y2="749.5" className="stroke-muted-foreground"></line><line y1="799.5" x2="1920" y2="799.5" className="stroke-muted-foreground"></line><line y1="849.5" x2="1920" y2="849.5" className="stroke-muted-foreground"></line><line y1="899.5" x2="1920" y2="899.5" className="stroke-muted-foreground"></line><line y1="949.5" x2="1920" y2="949.5" className="stroke-muted-foreground"></line><line y1="999.5" x2="1920" y2="999.5" className="stroke-muted-foreground"></line><line y1="1049.5" x2="1920" y2="1049.5" className="stroke-muted-foreground"></line><g clipPath="url(#clip1_4_5)"><line x1="49.6133" y1="3.99995" x2="49.7268" y2="1084" className="stroke-muted-foreground"></line><line x1="99.7275" y1="3.99995" x2="99.8411" y2="1084" className="stroke-muted-foreground"></line><line x1="149.841" y1="3.99995" x2="149.954" y2="1084" className="stroke-muted-foreground"></line><line x1="199.954" y1="3.99995" x2="200.068" y2="1084" className="stroke-muted-foreground"></line><line x1="250.067" y1="3.99995" x2="250.181" y2="1084" className="stroke-muted-foreground"></line><line x1="300.182" y1="3.99995" x2="300.295" y2="1084" className="stroke-muted-foreground"></line><line x1="350.295" y1="3.99995" x2="350.408" y2="1084" className="stroke-muted-foreground"></line><line x1="400.408" y1="3.99995" x2="400.522" y2="1084" className="stroke-muted-foreground"></line><line x1="450.521" y1="3.99995" x2="450.635" y2="1084" className="stroke-muted-foreground"></line><line x1="500.636" y1="3.99995" x2="500.749" y2="1084" className="stroke-muted-foreground"></line><line x1="550.749" y1="3.99995" x2="550.863" y2="1084" className="stroke-muted-foreground"></line><line x1="600.862" y1="3.99995" x2="600.976" y2="1084" className="stroke-muted-foreground"></line><line x1="650.976" y1="3.99995" x2="651.089" y2="1084" className="stroke-muted-foreground"></line><line x1="701.09" y1="3.99995" x2="701.203" y2="1084" className="stroke-muted-foreground"></line><line x1="751.203" y1="3.99995" x2="751.317" y2="1084" className="stroke-muted-foreground"></line><line x1="801.316" y1="3.99995" x2="801.43" y2="1084" className="stroke-muted-foreground"></line><line x1="851.43" y1="3.99995" x2="851.543" y2="1084" className="stroke-muted-foreground"></line><line x1="901.544" y1="3.99995" x2="901.657" y2="1084" className="stroke-muted-foreground"></line><line x1="951.657" y1="3.99995" x2="951.771" y2="1084" className="stroke-muted-foreground"></line><line x1="1001.77" y1="3.99995" x2="1001.88" y2="1084" className="stroke-muted-foreground"></line><line x1="1051.88" y1="3.99995" x2="1052" y2="1084" className="stroke-muted-foreground"></line><line x1="1102" y1="3.99995" x2="1102.11" y2="1084" className="stroke-muted-foreground"></line><line x1="1152.11" y1="3.99995" x2="1152.22" y2="1084" className="stroke-muted-foreground"></line><line x1="1202.22" y1="3.99995" x2="1202.34" y2="1084" className="stroke-muted-foreground"></line><line x1="1252.34" y1="3.99995" x2="1252.45" y2="1084" className="stroke-muted-foreground"></line><line x1="1302.45" y1="3.99995" x2="1302.57" y2="1084" className="stroke-muted-foreground"></line><line x1="1352.57" y1="3.99995" x2="1352.68" y2="1084" className="stroke-muted-foreground"></line><line x1="1402.68" y1="3.99995" x2="1402.79" y2="1084" className="stroke-muted-foreground"></line><line x1="1452.79" y1="3.99995" x2="1452.91" y2="1084" className="stroke-muted-foreground"></line><line x1="1502.91" y1="3.99995" x2="1503.02" y2="1084" className="stroke-muted-foreground"></line><line x1="1553.02" y1="3.99995" x2="1553.13" y2="1084" className="stroke-muted-foreground"></line><line x1="1603.13" y1="3.99995" x2="1603.25" y2="1084" className="stroke-muted-foreground"></line><line x1="1653.25" y1="3.99995" x2="1653.36" y2="1084" className="stroke-muted-foreground"></line><line x1="1703.36" y1="3.99995" x2="1703.47" y2="1084" className="stroke-muted-foreground"></line><line x1="1753.47" y1="3.99995" x2="1753.59" y2="1084" className="stroke-muted-foreground"></line><line x1="1803.59" y1="3.99995" x2="1803.7" y2="1084" className="stroke-muted-foreground"></line><line x1="1853.7" y1="3.99995" x2="1853.81" y2="1084" className="stroke-muted-foreground"></line><line x1="1903.81" y1="3.99995" x2="1903.93" y2="1084" className="stroke-muted-foreground"></line></g></g><defs><clipPath id="clip0_4_5"><rect width="1920" height="1080" fill="#000000"></rect></clipPath><clipPath id="clip1_4_5"><rect width="1920" height="1080" fill="#000000" transform="translate(-1 4)"></rect></clipPath></defs></svg>

        </div>
      </div>
      <div className="w-full max-w-[450px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700/50 relative overflow-hidden"
        >
          {/* 添加装饰性光效 */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          
          {/* 原有的标题和表单内容 */}
          {/* <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6 relative">
            Submit Your MCP {selectedType === 'server' ? 'Server' : 'Client'}
          </h1> */}
          
          {/* Toast 和表单部分保持不变 */}
          <AnimatePresence>
            {toastInfo && (
              <Toast {...toastInfo} />
            )}
          </AnimatePresence>
          
          
   
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
          {/* <motion.div
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
          </motion.div> */}
          
          {/* <motion.div
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
          </motion.div> */}
          
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
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit Project'
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
      </motion.div>
          
      </div>
      {/* 调整 Projects 组件的布局 */}
        {/* <Projects viewType={'class'} projects={projects} /> */}
    </>
  );
}