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
// 添加 useTranslations 导入
import { useTranslations } from 'next-intl';

export default function SubmitForm() {
  const t = useTranslations('submit');
  const pageT = useTranslations('submitPage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastInfo, setToastInfo] = useState<ToastProps | null>(null);
  const router = useRouter();
  
  // 定义表单值的类型接口
  interface FormValues {
    githubUrl: string;
    type: 'server' | 'client';
  }

  // 添加 formSchema 定义，使用翻译文本
  const formSchema = z.object({
    githubUrl: z.string()
      .url(t('validation.githubUrl.invalid'))
      .regex(/^https:\/\/github\.com\//, t('validation.githubUrl.format')),
    type: z.enum(["server", "client"]),
  });

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
      const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error('Failed to fetch project information');
        }
        const projectData = responseData.data;
        if(projectData.url){
          delete projectData.sort
        }else {
          projectData.sort = await findMaxSort();
        }
        projectData.user_submit = true
        projectData.submit_time = new Date().toISOString();

        // Insert project data
        const result = await insertProject(projectData);
        console.log('Project details fetched successfully:', result)
        
        // Reset form
        form.reset();
        
        // Show success message
        showToast("Success", `Your MCP ${values.type === 'server' ? 'Server' : 'Client'} has been submitted!`, "success");
        
        // Redirect to detail page after a short delay
        setTimeout(() => {
          const detailPath = `/${projectData.type}s/${encodeURIComponent(projectData.name)}`;
          router.push(detailPath);
        }, 500);
    } catch (error) {
        // Check for unique constraint error
        if ((error as any).code === '23505' && (error as any)?.message?.includes('projects_name_key')) {
          // Project name already exists error
          showToast("Failed", `Project already exists, please use a different GitHub URL`, "error");
        } else {
          // Other errors
          showToast("Failed", "Submission failed, please try again later", "error");
        }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="relative overflow-hidden">
      {/* Toast 组件 */}
      <AnimatePresence>
        {toastInfo && (
          <Toast {...toastInfo} />
        )}
      </AnimatePresence>

      {/* 顶部安全间距 */}
      <div className="pt-6 sm:pt-10 md:pt-12"></div>

      <div className="mx-auto w-full min-h-[50vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          {/* Product Hunt 按钮 */}
          <div className="flex justify-center mb-6 mt-[20px] sm:mt-[-30px] md:mt-[-60px] lg:mt-[-90px]">
            <div className="relative z-20">
              <a 
                target="_blank" 
                href="https://www.producthunt.com/posts/mcp-servers-2"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=940368&theme=light" 
                  alt="MCP Servers - A MCP Servers resource navigation station" 
                  width="250" 
                  height="54" 
                />
              </a>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-gradient-x">
            {pageT('title')}
          </h1>
          
          <h2 className="text-sm sm:text-base md:text-lg text-[#898989] dark:text-white mb-6 sm:mb-8 px-2 sm:px-8 md:px-20">
            {pageT('subtitle')}
          </h2>
        </div>
      </div>

      {/* 表单部分 */}
      <div className="" style={{marginTop:'-100px',paddingBottom:'70px'}}>
        <div className="w-full max-w-[450px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700/50 relative overflow-hidden"
          >
          {/* 装饰性光效 */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* 类型选择字段 - 使用国际化文案 */}
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        {t('form.projectType')}
                      </FormLabel>
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
                          {t('form.server')}
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
                          {t('form.client')}
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
              
              {/* GitHub URL 字段 - 使用国际化文案 */}
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        {t('form.githubUrl')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('form.githubUrlPlaceholder')}
                          className="!rounded border-gray-300 dark:border-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500 transition-all" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              {/* 提交按钮 - 使用国际化文案 */}
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
                      {t('form.submitting')}
                    </div>
                  ) : (
                    t('form.submitButton')
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
