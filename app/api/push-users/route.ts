import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import * as nodemailer from "nodemailer";
import { getProjectById } from "@/services/project";

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 获取所有用户
async function getAllUsers() {
  // 模拟一个用户数据，替代实际的Clerk API调用
  const users = [
    {
      id: 'mock_user_id',
      username: 'MockUser',
      primaryEmailAddressId: 'mock_email_id',
      emailAddresses: [
        {
          id: 'mock_email_id',
          emailAddress: '276904521@qq.com'
        }
      ]
    }
  ];
  
  return users;
}

// 从数据库获取项目信息
async function getProjectInfo(projectId: string) {
  // 将字符串ID转换为数字
  const numericId = parseInt(projectId, 10);
  
  if (isNaN(numericId)) {
    throw new Error(`Invalid project ID: ${projectId}`);
  }
  
  const project = await getProjectById(numericId);
  
  if (!project) {
    throw new Error(`Project with ID ${projectId} not found`);
  }
  return project;
}

// 发送欢迎邮件
async function sendProjectEmail(email: string, username: string, projectInfo: any) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "MCP Directory Project Update Notification",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <!-- Header -->
        <div style="background-color: #4a6cf7; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 600;">MCP Directory</h1>
          <p style="margin: 10px 0 0; font-size: 16px;">Project Update Notification</p>
        </div>
        
        <!-- Content Area -->
        <div style="background-color: #ffffff; padding: 30px 25px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
          <h2 style="color: #333; font-size: 20px; margin-top: 0;">Dear ${username},</h2>
          <p style="color: #555; font-size: 16px;">We're excited to share a project update with you:</p>
          
          <!-- Project Info Card -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #4a6cf7; padding: 25px; border-radius: 5px; margin: 25px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <h3 style="color: #4a6cf7; font-size: 18px; margin-top: 0; margin-bottom: 15px;">${projectInfo.title}</h3>
            <p style="margin: 10px 0; color: #555;"><span style="color: #333; font-weight: 600;">Author: </span>${projectInfo.author_name}</p>
            <p style="margin: 10px 0; color: #555;"><span style="color: #333; font-weight: 600;">Project Link: </span>
              <a href="https://mcp.ad/project/${projectInfo.name}" style="color: #4a6cf7; text-decoration: none; font-weight: 500;">https://mcp.ad/project/${projectInfo.name}</a>
            </p>
            <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
              <p style="color: #333; font-weight: 600; margin-bottom: 8px;">Project Description:</p>
              <p style="color: #555; margin-top: 0;">${projectInfo.content}</p>
            </div>
          </div>
          
          <!-- Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://mcp.ad/project/${projectInfo.name}" style="background-color: #4a6cf7; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: 500; display: inline-block;">View Project Details</a>
          </div>
          
          <p style="color: #555;">If you're interested in this project, please click the button above to learn more.</p>
          <p style="color: #555;">Happy exploring!</p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
          <p style="margin: 0 0 10px;">Best regards,</p>
          <p style="margin: 0; font-weight: 500;">MCP Directory Team</p>
          <div style="margin-top: 15px; font-size: 12px; color: #999;">
            <p style="margin: 5px 0;">© 2023 MCP Directory. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    // Check if projectId exists
    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    const projectInfo = await getProjectInfo(projectId);
    const allUsers = await getAllUsers();
    
    for (const user of allUsers) {
      const primaryEmail = user.emailAddresses.find(
        (email: { id: string }) => email.id === user.primaryEmailAddressId
      );

      if (primaryEmail) {
        await sendProjectEmail(
          primaryEmail.emailAddress,
          user.username || "User",
          projectInfo
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully sent project update emails to ${allUsers.length} users`,
    });
  } catch (error) {
    console.error("Failed to send emails:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
