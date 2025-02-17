/** @ts-ignore , vue-demi seems to be not strongly typed so typescript freaks out. */
import { App, Vue2, Plugin, PluginObject } from "vue-demi";
import {
  SupabaseClient,
  SupabaseClientOptions,
  SupabaseRealtimePayload,
  AuthUser,
  AuthSession,
  Subscription,
} from "@supabase/supabase-js";
import { VueSupabaseClient, createVueSupabase } from "./VueSupabaseClient";
import {
  useSupabase,
  useSupabaseAuth,
  useSupabaseStorage,
} from "./composables";

// @ts-expect-error: Module vue/types/vue cannot be found.
declare module "vue/types/vue" {
  interface Vue {
    $supabase: SupabaseClient;
  }
}

export type SupabasePluginOptions = {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions;
};

export function install(
  app: typeof Vue2 | App,
  options: SupabasePluginOptions
) {
  const supabase = new VueSupabaseClient(
    options.supabaseUrl,
    options.supabaseKey,
    options.supabaseOptions
  );
  supabase.install(app);
}

export { useSupabase, useSupabaseAuth, useSupabaseStorage, createVueSupabase };

export {
  SupabaseClient,
  SupabaseClientOptions,
  SupabaseRealtimePayload,
  AuthUser,
  AuthUser as User,
  AuthSession,
  AuthSession as Session,
  Subscription,
};

const VueSupabase: PluginObject<SupabasePluginOptions> | Plugin = {
  install,
};

export default VueSupabase;
