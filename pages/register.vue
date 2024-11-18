<template>
  <div class="card flex justify-center">
    <Form
      :initialValues
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-80 bg-white shadow-md p-6 mt-6"
    >
      <h1>Register</h1>
      <FormField
        v-slot="$field"
        name="firstname"
        initialValue=""
        :resolver="zodFirstNameResolver"
        class="flex flex-col gap-1"
      >
        <InputText type="text" placeholder="First Name" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField
        v-slot="$field"
        name="lastname"
        initialValue=""
        :resolver="zodLastNameResolver"
        class="flex flex-col gap-1"
      >
        <InputText type="text" placeholder="Last Name" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField
        v-slot="$field"
        name="username"
        initialValue=""
        :resolver="zodUserNameResolver"
        class="flex flex-col gap-1"
      >
        <InputText type="text" placeholder="User Name" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField
        v-slot="$field"
        name="email"
        class="flex flex-col gap-1"
        :resolver="emailResolver"
      >
        <InputText placeholder="E-mail" type="email" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField
        v-slot="$field"
        name="password"
        initialValue=""
        :resolver="customPasswordResolver"
        class="flex flex-col gap-1"
      >
        <Password
          type="text"
          placeholder="Password"
          :feedback="false"
          toggleMask
          fluid
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <Button type="submit" severity="secondary" label="Submit" />
      <p>
        Already have an account?
        <nuxt-link class="text-green-600" to="/login">Login</nuxt-link>
      </p>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const initialValues = reactive({});

const emailResolver = zodResolver(z.string().email());

const zodFirstNameResolver = zodResolver(
  z.string().min(1, { message: "First name is required." })
);
const zodLastNameResolver = zodResolver(
  z.string().min(1, { message: "Last name is required." })
);
const zodUserNameResolver = zodResolver(
  z.string().min(1, { message: "User namee is required." })
);

const customPasswordResolver = zodResolver(
  z.string().min(6, { message: "Required." })
);

const onFormSubmit = ({
  valid,
  values,
}: {
  valid: boolean;
  values: Object;
}) => {
  console.log(valid);
  console.log(values);

  if (valid) {
    authStore.register(values);
    router.push("/login");
  }
};
</script>
