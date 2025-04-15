"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const MainModal = () => {
  const [isLoading, setIsloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsloading(true);
      const res = await axios.post("/api/store", values);
      console.log(res);
      toast.success(`${res.data.message}`);
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.response.data.error}`);
    } finally {
      setIsloading(false);
    }
  }
  return (
    <>
      <Modal>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Store Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="flex">
              {isLoading && <Loader2 className="animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </Modal>
    </>
  );
};
