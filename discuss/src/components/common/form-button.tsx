'use client'
import {useFormStatus} from 'react-dom'
import {Button} from "@nextui-org/react";
import {ReactNode} from "react";

type FormButtonProps = {
    children: ReactNode
}

export default function FormButton({children}: FormButtonProps) {

    const {pending} = useFormStatus();
    return (
        <Button type="submit" isLoading={pending}>
            {children}
        </Button>
    )
}
