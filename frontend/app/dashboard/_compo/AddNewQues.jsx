"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const AddNewQues = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobRole, setJobRole] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [exp, setExp] = useState(0)

    const onSubmit=e=>{
        e.preventDefault()
        console.log(jobRole, jobDesc, exp   )
    }
    return (
        <div>
            <div className='p-10 border cursor-pointer rounded-lg bg-gray-100 hover:scale-105 transition-all hover:shadow-lg active:scale-100'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center font-sans'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='max-w-2xl!'>
                    <DialogHeader>
                        <DialogTitle>Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div className=''>
                                    <h2 className='text-sm! mb-4!'>Add Details about your job position/role, Job description and years of experience</h2>
                                    <div className='mb-2'>
                                        <label>Job Role/Job Position</label>
                                        <Input className='mt-3' type='text' placeholder='Job Role/Job Position' required onChange={(e) => setJobRole(e.target.value)}/>
                                    </div>
                                    <div className='mb-2'>
                                        <label>Job Description/ Tech Stack (In Short)</label>
                                        <Textarea className='mt-3' type='text' placeholder='Ex. React, Angular,NodeJs, NextJs, ETC...' required onChange={(e) => setJobDesc(e.target.value)}/>
                                    </div>
                                    <div className='mb-2'>
                                        <label>Year's Of Experience</label>
                                        <Input className='mt-3' type='number' placeholder='Ex. 5' required onChange={(e) => setExp(Number(e.target.value))}/>
                                    </div>
                                    <div className='flex items-center justify-end mt-4 gap-4'>
                                        <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                        <Button type='submit'>Start Interview</Button>
                                    </div>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewQues