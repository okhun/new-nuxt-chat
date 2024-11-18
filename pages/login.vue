<template>
  <div class="card flex justify-center">
    <Form
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-80 bg-white shadow-md p-6 mt-6"
    >
      <h1>Login</h1>

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

      <Button type="submit" severity="secondary" label="Login" />
      <p>
        Don't have an account?
        <nuxt-link class="text-green-600" to="/register">Register</nuxt-link>
      </p>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
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
  if (valid) {
    authStore.login(values);
  }
};
</script>
