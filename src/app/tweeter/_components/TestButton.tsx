"use client";
import {api} from "~/trpc/react";
import React from "react";
export default function TestButton() {

const accountCreateMutation = api.account.create.useMutation({
        onSuccess: () => {
            console.log("Create Success");
        }
    }
);
const accountRecreateMutation = api.account.remove.useMutation({
    onSuccess: () => {
        console.log("Delete Success");
        accountCreateMutation.mutate({email: "test@gmail.com", username: "test"})
    },
    onError: () => {
        console.log("Delete Fail");
        accountCreateMutation.mutate({email: "test@gmail.com", username: "test"});
    }
})
return (<button onClick={() => {
    accountRecreateMutation.mutate({email: "test@gmail.com"})
}}
        className={`w-8 h-2 bg-blue-500`}>
    test
</button>)

}
