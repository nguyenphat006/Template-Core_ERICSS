'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { ZodError } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Upload, X, Image as ImageIcon, Camera } from 'lucide-react'
import { User, UserCreateRequest, UserRole } from '@/types/admin/user.interface'
import { useUploadMedia } from '@/hooks/useUploadMedia'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { userCreateSchema, userUpdateSchema } from '@/utils/schema'

interface UsersModalUpsertProps {
  roles: UserRole[];
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  user: User | null; 
  onSubmit: (data: User | UserCreateRequest) => Promise<void>; 
}

export default function UsersModalUpsert({
  roles, open, onClose, mode, user, onSubmit
}: UsersModalUpsertProps) {
  const t = useTranslations()
  
  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [avatar, setAvatar] = useState("")
  const [roleId, setRoleId] = useState<number>(1) 
  const [status, setStatus] = useState("ACTIVE")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Upload media hook
  const { 
    files, 
    uploadedUrls, 
    isUploading,
    progress,
    error: uploadError,
    handleAddFiles,
    handleRemoveFile,
    handleRemoveAllFiles,
    uploadFiles,
    reset: resetUpload
  } = useUploadMedia()

  // Status options
  const STATUS_OPTIONS = [
    { value: 'ACTIVE', label: t('admin.users.modal.statusActive') || 'Hoạt động' },
    { value: 'INACTIVE', label: t('admin.users.modal.statusInactive') || 'Không hoạt động' },
  ]

  // Reset form when modal opens or mode/user changes
  useEffect(() => {
    if (mode === 'edit' && user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setPhoneNumber(user.phoneNumber || "")
      setAvatar(user.avatar || "")
      setRoleId(user.roleId || 1)
      setStatus(user.status || "ACTIVE")
      setPassword("")
      setConfirmPassword("")
      
      // Reset upload state
      resetUpload()
    } else if (mode === 'add') {
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setPhoneNumber("")
      setAvatar("")
      setRoleId(1)
      setStatus("ACTIVE")
      setErrors({})
      
      // Reset upload state
      resetUpload()
    }
  }, [mode, user, open, resetUpload])

  // Handle file change for avatar upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddFiles(e.target.files);
    }
  };
  
  // Handle avatar upload
  const handleUploadAvatar = async () => {
    if (files.length === 0) return;
    
    const urls = await uploadFiles();
    if (urls.length > 0) {
      // Use the first uploaded image URL as avatar
      setAvatar(urls[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'add') {
        userCreateSchema(t).parse({
          email,
          name,
          phoneNumber,
          password,
          confirmPassword,
          roleId,
          status
        });
      } else {
        userUpdateSchema(t).parse({
          email,
          name,
          phoneNumber,
          roleId,
          status,
          password,
          confirmPassword
        });
      }
      
      setErrors({});
      setLoading(true);
      
      try {
        if (mode === 'add') {
          const data: UserCreateRequest = {
            email,
            name,
            phoneNumber,
            password, // Only send password, not confirmPassword
            roleId,
            status,
            avatar
          };
          await onSubmit(data);
        } else if (mode === 'edit' && user) {
          const data = {
            ...user,
            email,
            name,
            phoneNumber,
            roleId,
            status,
            avatar,
            // Add password for edit mode (no confirmPassword)
            password,
          };
          await onSubmit(data);
        }
        onClose();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? t('admin.users.modal.addTitle') || 'Thêm người dùng' : t('admin.users.modal.editTitle') || 'Chỉnh sửa người dùng'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? t('admin.users.modal.addDescription') || 'Điền thông tin để thêm người dùng mới'
              : t('admin.users.modal.editDescription') || 'Chỉnh sửa thông tin người dùng'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.name') || 'Họ tên'}
              </label>
              <Input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder={t('admin.users.modal.name') || 'Họ tên'} 
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.email') || 'Email'}
              </label>
              <Input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder={t('admin.users.modal.email') || 'Email'}
                disabled={mode === 'edit'}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.phoneNumber') || 'Số điện thoại'}
              </label>
              <Input 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)} 
                placeholder={t('admin.users.modal.phoneNumber') || 'Số điện thoại'} 
              />
              {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.avatar') || 'Ảnh đại diện'}
              </label>
              
              <div className="space-y-3">
                {/* Avatar preview with integrated select button */}
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <Avatar className="h-16 w-16 border-2 border-gray-200">
                      {avatar ? (
                        <AvatarImage 
                          src={avatar} 
                          alt="Avatar preview" 
                          className="object-cover" 
                        />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {name ? name.substring(0, 2).toUpperCase() : <ImageIcon className="h-6 w-6" />}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    {/* Overlay select button */}
                    <button 
                      type="button"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                      disabled={isUploading}
                      aria-label={t('admin.users.modal.selectImage') || 'Chọn ảnh đại diện'}
                      title={t('admin.users.modal.selectImage') || 'Chọn ảnh đại diện'}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"
                    >
                      <Camera className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  
                  {/* Avatar URL - Read Only */}
                  <div className="flex-1 space-y-1">
                    <Input 
                      value={avatar} 
                      readOnly
                      placeholder={t('admin.users.modal.avatarUrl') || 'URL sẽ được tạo sau khi tải lên'} 
                      className="bg-muted"
                    />
                    
                    {/* Upload button only shown when a file is selected */}
                    {files.length > 0 && (
                      <Button 
                        type="button"
                        size="sm"
                        onClick={handleUploadAvatar}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? t('admin.users.modal.uploading') || 'Đang tải lên...' : t('admin.users.modal.uploadImage') || 'Tải lên'}
                      </Button>
                    )}
                  </div>
                </div>
                
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  accept="image/*"
                  aria-label={t('admin.users.modal.selectImage') || 'Chọn ảnh đại diện'}
                />
                
                {/* Upload progress */}
                {isUploading && (
                  <div className="space-y-1">
                    <Progress value={progress} className="h-1" />
                    <p className="text-xs text-muted-foreground">
                      {progress}% {t('admin.users.modal.completed') || 'đã hoàn thành'}
                    </p>
                  </div>
                )}
                
                {/* File preview */}
                {files.length > 0 && !isUploading && (
                  <div className="text-xs text-muted-foreground">
                    {files[0].name} ({Math.round(files[0].size / 1024)} KB)
                  </div>
                )}
                
                {/* Upload error */}
                {uploadError && (
                  <p className="text-sm text-red-500">{uploadError}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.role') || 'Vai trò'}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    {roles.find(role => role.id === roleId)?.name || t('admin.users.modal.selectRole') || 'Chọn vai trò'}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {roles.map((role) => (
                    <DropdownMenuItem
                      key={role.id}
                      onClick={() => setRoleId(role.id)}
                    >
                      {role.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {errors.roleId && <p className="text-sm text-red-500 mt-1">{errors.roleId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.status') || 'Trạng thái'}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    {STATUS_OPTIONS.find(option => option.value === status)?.label || 'Chọn trạng thái'}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {STATUS_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setStatus(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.password') || 'Mật khẩu'}
                {mode === 'edit' && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
              <Input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder={t('admin.users.modal.password') || 'Mật khẩu'} 
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.users.modal.confirmPassword') || 'Xác nhận mật khẩu'}
                {mode === 'edit' && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
              <Input 
                type="password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                placeholder={t('admin.users.modal.confirmPassword') || 'Xác nhận mật khẩu'} 
              />
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={loading}
            >
              {t('admin.users.modal.cancel') || 'Hủy'}
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading 
                ? (mode === 'add' ? t('admin.users.modal.adding') || 'Đang thêm...' : t('admin.users.modal.saving') || 'Đang lưu...')
                : (mode === 'add' ? t('admin.users.modal.add') || 'Thêm' : t('admin.users.modal.save') || 'Lưu')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
