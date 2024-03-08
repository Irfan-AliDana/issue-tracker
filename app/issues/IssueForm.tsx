"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { IssueSchema } from "@/lib/schemaValidations";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const IssueForm = () => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof IssueSchema>>({
        resolver: zodResolver(IssueSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    async function onSubmit(data: z.infer<typeof IssueSchema>) {
        try {
            await axios.post(`/api/issues`, data);

            toast({
                title: "Success!",
                description: "Form Submitted Successfully",
                className: "bg-green-200",
            });

            router.push("/issues");
            router.refresh();
        } catch (error) {
            toast({
                title: "Error!",
                description: "Unexpected Error Occured",
                className: "bg-red-200",
            });
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 md:w-1/2 space-y-6 mx-auto xl:mx-0"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Logout Button"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Fix: The logout button is not working!"
                                        {...field}
                                    ></Textarea>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className={
                            form.formState.isSubmitting ? "w-36" : "w-28"
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <span className="mr-2">Submitting </span>
                                <Spinner
                                    width="w-6"
                                    height="h-6"
                                    borderWidth="border-2"
                                />
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default IssueForm;
