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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Dear ${username},</h2>
        <p>We're excited to share a project update with you:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>${projectInfo.title}</h3>
          <p><strong>Author: </strong>${projectInfo.author_name}</p>
          <p><strong>Project Link: </strong><a href="https://mcp.ad/project/${projectInfo.name}">https://mcp.ad/project/${projectInfo.name}</a></p>
          <div style="margin-top: 15px;">
            <p><strong>Project Description:</strong></p>
            <p>${projectInfo.content}</p>
          </div>
        </div>
        <p>If you're interested in this project, please click the link above to learn more.</p>
        <p>Enjoy exploring!</p>
        <br>
        <p>Best regards,</p>
        <p>MCP Directory Team</p>
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
