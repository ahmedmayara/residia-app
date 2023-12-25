"use client";

import React from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { categories } from "@/constants";
import { HostHomeSchema, HostHomeSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useHostDialog } from "@/hooks/useHostDialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { CategoryBox } from "@/components/category-box";
import { Counter } from "@/components/counter";
import { CountrySelect } from "@/components/country-select";
import { Dialog } from "@/components/dialogs/dialog";
import { DialogHeading } from "@/components/dialogs/dialog-heading";
import { ImageUploader } from "@/components/image-uploader";
import { PriceInput } from "@/components/price-input";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const steps = [
  {
    id: STEPS.CATEGORY,
    title: "Which category best describes your place?",
    subtitle: "Don't worry, you can change this later.",
    fields: ["type"],
  },
  {
    id: STEPS.LOCATION,
    title: "Where's your place located?",
    subtitle:
      "Guests will only get your exact address once they've booked a reservation.",
    fields: ["country", "city", "address"],
  },
  {
    id: STEPS.INFO,
    title: "Start with the basics",
    subtitle: "We'll ask for more details later.",
    fields: ["guests", "rooms", "bathrooms"],
  },
  {
    id: STEPS.IMAGES,
    title: "Upload some photos",
    subtitle: "Guests love photos. Add at least a photo to get started.",
    fields: ["images"],
  },
  {
    id: STEPS.DESCRIPTION,
    title: "Describe your place to guests",
    subtitle:
      "Tell guests about the number of bedrooms and bathrooms, the neighborhood, and what makes your place special.",
    fields: ["title", "description"],
  },
  {
    id: STEPS.PRICE,
    title: "Set your price",
    subtitle:
      "We suggest starting with a low price to get some bookings and earn some initial reviews. You can update your price at any time.",
    fields: ["price"],
  },
];

export function HostDialog() {
  const hostDialog = useHostDialog();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState(STEPS.CATEGORY);

  const hostHomeForm = useForm<HostHomeSchemaType>({
    resolver: zodResolver(HostHomeSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      type: "",
      price: 1,
      rooms: 1,
      bathrooms: 1,
      guests: 1,
      city: "",
      address: "",
    },
  });

  const country = hostHomeForm.watch("country");
  const price = hostHomeForm.watch("price");

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../map").then((mod) => mod.Map), {
        loading: () => <Skeleton className="h-[25vh] rounded-lg" />,
        ssr: false,
      }),
    [country],
  );

  type FormKeys = keyof HostHomeSchemaType;

  const setCustomeValue = (name: FormKeys, value: any) => {
    hostHomeForm.setValue(name, value);
  };

  const nextStep = async () => {
    const fields = steps[step].fields;
    const output = await hostHomeForm.trigger(fields as FormKeys[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (step === STEPS.PRICE) {
      hostHomeForm.handleSubmit(onSubmit)();
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const onSubmit: SubmitHandler<HostHomeSchemaType> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        hostDialog.onOpenChange(false);
        toast.success("Listing created successfully.");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <DialogHeading
        title="Which category best describes your place?"
        subtitle="Don't worry, you can change this later."
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            icon={category.icon}
            onClick={(value) => setCustomeValue("type", value)}
            label={category.label}
            selected={hostHomeForm.watch("type") === category.label}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeading
          title="Where's your place located?"
          subtitle="Guests will only get your exact address once they've booked a reservation."
        />

        <Form {...hostHomeForm}>
          <form
            onSubmit={hostHomeForm.handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col gap-4"
          >
            <FormField
              control={hostHomeForm.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelect
                      value={field.value}
                      onValueChange={(value) =>
                        setCustomeValue("country", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={hostHomeForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={hostHomeForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Map center={country?.latlang} />
            </div>
          </form>
        </Form>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeading
          title="Start with the basics"
          subtitle="We'll ask for more details later."
        />

        <Counter
          title="Guests"
          subtitle="How many guests can your place accommodate?"
          value={hostHomeForm.watch("guests")}
          onCounterChange={(value) => setCustomeValue("guests", value)}
        />

        <Separator />

        <Counter
          title="Bedrooms"
          subtitle="How many bedrooms can guests use?"
          value={hostHomeForm.watch("rooms")}
          onCounterChange={(value) => setCustomeValue("rooms", value)}
        />

        <Separator />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms can guests use?"
          value={hostHomeForm.watch("bathrooms")}
          onCounterChange={(value) => setCustomeValue("bathrooms", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeading
          title="Upload some photos"
          subtitle="Guests love photos. Add at least a photo to get started. (16:9 ratio is recommended)"
        />

        <ImageUploader
          endpoint="imageUploader"
          values={hostHomeForm.watch("images")}
          onValuesChange={(values) => setCustomeValue("images", values)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeading
          title="Describe your place to guests"
          subtitle="Tell guests about the number of bedrooms and bathrooms, the neighborhood, and what makes your place special."
        />

        <Form {...hostHomeForm}>
          <form
            onSubmit={hostHomeForm.handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col gap-4"
          >
            <FormField
              control={hostHomeForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={hostHomeForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your place to guests..."
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeading
          title="Set your price"
          subtitle="We suggest starting with a low price to get some bookings and earn
                some initial reviews. You can update your price at any time."
        />

        <form
          onSubmit={hostHomeForm.handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price per night</Label>
            <PriceInput
              value={price}
              onValueChange={(value) => setCustomeValue("price", value)}
            />
            {hostHomeForm.formState.errors.price && (
              <p className="text-sm font-medium text-destructive">
                {hostHomeForm.formState.errors.price.message}
              </p>
            )}
          </div>
        </form>
      </div>
    );
  }

  const footerContent = (
    <div className="flex flex-col gap-2">
      {hostHomeForm.formState.errors.type && (
        <p className="text-red-500">
          {hostHomeForm.formState.errors.type.message}
        </p>
      )}
    </div>
  );

  return (
    <Dialog
      open={hostDialog.open}
      disabled={isLoading}
      title="Host a new place"
      body={bodyContent}
      onClose={() => hostDialog.onOpenChange(false)}
      onSubmit={() => nextStep()}
      footer={footerContent}
      actionLabel={step === STEPS.PRICE ? "Publish" : "Next"}
      secondaryAction={step === STEPS.CATEGORY ? undefined : () => prevStep()}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : "Previous"}
    />
  );
}
