'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
// import { PasswordInput } from '@/components/password-input'
// import { userTypes } from '../data/data'


import { Role } from '../data/schema'

// const formSchema = z
//   .object({
//     firstName: z.string().min(1, { message: 'First Name is required.' }),
//     lastName: z.string().min(1, { message: 'Last Name is required.' }),
//     username: z.string().min(1, { message: 'Username is required.' }),
//     phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
//     email: z
//       .string()
//       .min(1, { message: 'Email is required.' })
//       .email({ message: 'Email is invalid.' }),
//     password: z.string().transform((pwd) => pwd.trim()),
//     role: z.string().min(1, { message: 'Role is required.' }),
//     confirmPassword: z.string().transform((pwd) => pwd.trim()),
//     isEdit: z.boolean(),
//   })
const formSchema = z.object({
  role_name: z.string().min(1, { message: 'Role name is required.' }),
  role_desc: z.string().nullable(),
  is_active: z.boolean(),
  isEdit: z.boolean(),
})
  // .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
  //   if (!isEdit || (isEdit && password !== '')) {
  //     if (password === '') {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: 'Password is required.',
  //         path: ['password'],
  //       })
  //     }

  //     if (password.length < 8) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: 'Password must be at least 8 characters long.',
  //         path: ['password'],
  //       })
  //     }

  //     if (!password.match(/[a-z]/)) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: 'Password must contain at least one lowercase letter.',
  //         path: ['password'],
  //       })
  //     }

  //     if (!password.match(/\d/)) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: 'Password must contain at least one number.',
  //         path: ['password'],
  //       })
  //     }

  //     if (password !== confirmPassword) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: "Passwords don't match.",
  //         path: ['confirmPassword'],
  //       })
  //     }
  //   }
  // })
type RoleForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RolesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  // const form = useForm<UserForm>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: isEdit
  //     ? {
  //         ...currentRow,
  //         password: '',
  //         confirmPassword: '',
  //         isEdit,
  //       }
  //     : {
  //         firstName: '',
  //         lastName: '',
  //         username: '',
  //         email: '',
  //         role: '',
  //         phoneNumber: '',
  //         password: '',
  //         confirmPassword: '',
  //         isEdit,
  //       },
  // })

  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        role_name: currentRow.role_name,
        role_desc: currentRow.role_desc,
        is_active: currentRow.is_active,
        isEdit,
      }
      : {
        role_name: '',
        role_desc: null,
        is_active: true,
        isEdit,
      },
  })

  // const onSubmit = (values: RoleForm) => {
  //   form.reset()
  //   toast({
  //     title: 'You submitted the following values:',
  //     description: (
  //       <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
  //         <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  //   onOpenChange(false)
  // }
  const onSubmit = (values: RoleForm) => {
    form.reset()

    const message = values.isEdit
      ? 'Role updated successfully.'
      : 'New role created successfully.'

    toast({
      title: message,
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })

    onOpenChange(false)
  }


  // const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Role' : 'Add New Role'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the role here. ' : 'Create new role here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[10.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='role_name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Role Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name='role_desc'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Role Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Doe'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name='role_desc'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Optional role description'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

           

              <FormField
                control={form.control}
                name='is_active'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>Status</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value ? 'active' : 'inactive'} // ✅ convert boolean to string
                      onValueChange={(value) => field.onChange(value === 'active')} // ✅ convert string to boolean
                      placeholder='Select status'
                      className='col-span-4'
                      items={[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' },
                      ]}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

           
           
              {/* <FormField
                control={form.control}
                name='is_active'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Role
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a role'
                      className='col-span-4'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              /> */}
             
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
