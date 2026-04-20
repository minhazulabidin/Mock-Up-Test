"use client"
import React,{useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

const AddNewQues = () => {
    const [openDialog,setOpenDialog]=useState(false)

    return (
        <div>
            <div className='p-10 border cursor-pointer rounded-lg bg-gray-100 hover:scale-105 transition-all hover:shadow-lg active:scale-100'
            onClick={()=>setOpenDialog(true)}
            >
                <h2 className='text-lg text-center font-sans'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                            <div className='flex items-center justify-end mt-4 gap-4'>
                                <Button variant='ghost' onClick={()=>setOpenDialog(false)}>Cancel</Button>
                                <Button>Start Interview</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewQues