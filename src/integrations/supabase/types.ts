export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      api_consultations: {
        Row: {
          api_name: string
          created_at: string | null
          endpoint: string
          error_message: string | null
          execution_time_ms: number | null
          id: number
          ip_address: string | null
          request_payload: Json | null
          response_payload: Json | null
          status_code: number | null
          user_id: string | null
        }
        Insert: {
          api_name: string
          created_at?: string | null
          endpoint: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: never
          ip_address?: string | null
          request_payload?: Json | null
          response_payload?: Json | null
          status_code?: number | null
          user_id?: string | null
        }
        Update: {
          api_name?: string
          created_at?: string | null
          endpoint?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: never
          ip_address?: string | null
          request_payload?: Json | null
          response_payload?: Json | null
          status_code?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      consultation_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_cents: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      consultations: {
        Row: {
          consultation_type: string
          cost_cents: number
          created_at: string
          id: string
          query_data: Json
          result_data: Json | null
          status: string | null
          user_id: string
        }
        Insert: {
          consultation_type: string
          cost_cents: number
          created_at?: string
          id?: string
          query_data: Json
          result_data?: Json | null
          status?: string | null
          user_id: string
        }
        Update: {
          consultation_type?: string
          cost_cents?: number
          created_at?: string
          id?: string
          query_data?: Json
          result_data?: Json | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      credit_packages: {
        Row: {
          bonus_percentage: number | null
          created_at: string
          credit_amount_cents: number
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          updated_at: string
        }
        Insert: {
          bonus_percentage?: number | null
          created_at?: string
          credit_amount_cents: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_cents: number
          updated_at?: string
        }
        Update: {
          bonus_percentage?: number | null
          created_at?: string
          credit_amount_cents?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount_cents: number
          created_at: string
          description: string
          id: string
          reference_id: string | null
          reference_type: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          description: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          description?: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      email_verifications: {
        Row: {
          code: string
          consumed_at: string | null
          created_at: string
          expires_at: string
          id: string
          purpose: string
          user_id: string
        }
        Insert: {
          code: string
          consumed_at?: string | null
          created_at?: string
          expires_at: string
          id?: string
          purpose: string
          user_id: string
        }
        Update: {
          code?: string
          consumed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          purpose?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount_cents: number
          completed_at: string | null
          consultation_data: Json | null
          consultation_type_id: string
          created_at: string
          currency: string | null
          id: string
          payment_data: Json | null
          payment_method: string | null
          result_data: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          completed_at?: string | null
          consultation_data?: Json | null
          consultation_type_id: string
          created_at?: string
          currency?: string | null
          id?: string
          payment_data?: Json | null
          payment_method?: string | null
          result_data?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          completed_at?: string | null
          consultation_data?: Json | null
          consultation_type_id?: string
          created_at?: string
          currency?: string | null
          id?: string
          payment_data?: Json | null
          payment_method?: string | null
          result_data?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_consultation_type_id_fkey"
            columns: ["consultation_type_id"]
            isOneToOne: false
            referencedRelation: "consultation_types"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          confirmed_at: string | null
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email_verified_at: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          terms_accepted_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_verified_at?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          phone?: string | null
          terms_accepted_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_verified_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          terms_accepted_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          id: number
          ownerid: number | null
        }
        Insert: {
          address: string
          id?: never
          ownerid?: number | null
        }
        Update: {
          address?: string
          id?: never
          ownerid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_ownerid_fkey"
            columns: ["ownerid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      protests: {
        Row: {
          createdat: string | null
          documentnumber: string
          documenttype: string | null
          id: number
          status: string | null
          value: number
        }
        Insert: {
          createdat?: string | null
          documentnumber: string
          documenttype?: string | null
          id?: never
          status?: string | null
          value: number
        }
        Update: {
          createdat?: string | null
          documentnumber?: string
          documenttype?: string | null
          id?: never
          status?: string | null
          value?: number
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          billing_period: string | null
          created_at: string
          description: string | null
          features: Json
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
        }
        Insert: {
          billing_period?: string | null
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          name: string
          price_cents: number
        }
        Update: {
          billing_period?: string | null
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
        }
        Relationships: []
      }
      subscription_plans_v2: {
        Row: {
          billing_period: string | null
          consultation_limits: Json
          created_at: string
          description: string | null
          features: Json
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          updated_at: string
        }
        Insert: {
          billing_period?: string | null
          consultation_limits?: Json
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          name: string
          price_cents: number
          updated_at?: string
        }
        Update: {
          billing_period?: string | null
          consultation_limits?: Json
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_agreements: {
        Row: {
          agreed: boolean
          consent_context: Json | null
          created_at: string | null
          device_info: Json | null
          id: number
          ip_address: unknown | null
          privacy_policy_version: string
          terms_of_use_version: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          agreed?: boolean
          consent_context?: Json | null
          created_at?: string | null
          device_info?: Json | null
          id?: never
          ip_address?: unknown | null
          privacy_policy_version: string
          terms_of_use_version: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          agreed?: boolean
          consent_context?: Json | null
          created_at?: string | null
          device_info?: Json | null
          id?: never
          ip_address?: unknown | null
          privacy_policy_version?: string
          terms_of_use_version?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          balance_cents: number
          created_at: string
          id: string
          total_earned_cents: number | null
          total_spent_cents: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          balance_cents?: number
          created_at?: string
          id?: string
          total_earned_cents?: number | null
          total_spent_cents?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          balance_cents?: number
          created_at?: string
          id?: string
          total_earned_cents?: number | null
          total_spent_cents?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          plan_id: string
          starts_at: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          plan_id: string
          starts_at: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          plan_id?: string
          starts_at?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions_v2: {
        Row: {
          consultation_usage: Json | null
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          consultation_usage?: Json | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          plan_id: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          consultation_usage?: Json | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_v2_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans_v2"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          createdat: string | null
          email: string
          id: number
          name: string
          passwordhash: string
          termsaccepted: boolean | null
        }
        Insert: {
          createdat?: string | null
          email: string
          id?: never
          name: string
          passwordhash: string
          termsaccepted?: boolean | null
        }
        Update: {
          createdat?: string | null
          email?: string
          id?: never
          name?: string
          passwordhash?: string
          termsaccepted?: boolean | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          id: number
          model: string | null
          ownerid: number | null
          plate: string
          year: number | null
        }
        Insert: {
          id?: never
          model?: string | null
          ownerid?: number | null
          plate: string
          year?: number | null
        }
        Update: {
          id?: never
          model?: string | null
          ownerid?: number | null
          plate?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_ownerid_fkey"
            columns: ["ownerid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_tokens: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          expires_at: string
          id: number
          token: string
          token_type: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          expires_at: string
          id?: never
          token: string
          token_type: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          expires_at?: string
          id?: never
          token?: string
          token_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_agreement: {
        Args: {
          p_privacy_version: string
          p_terms_version: string
          p_user_id: string
        }
        Returns: {
          privacy_policy: string
          requires_consent: boolean
          terms_of_use: string
        }[]
      }
      deduct_user_credits: {
        Args:
          | { amount_cents: number; description: string; user_id: string }
          | { p_amount: number; p_user_id: string }
        Returns: undefined
      }
      generate_verification_token: {
        Args: { p_token_type: string }
        Returns: {
          expires_at: string
          token: string
        }[]
      }
      log_api_consultation: {
        Args:
          | {
              p_api_name: string
              p_endpoint: string
              p_error_message?: string
              p_execution_time_ms?: number
              p_ip_address?: string
              p_request_payload: Json
              p_response_payload: Json
              p_status_code: number
              p_user_id: string
            }
          | { p_endpoint: string; p_status: number; p_user_id: string }
        Returns: undefined
      }
      log_user_agreement: {
        Args: {
          p_agreed: boolean
          p_consent_context?: Json
          p_device_info?: Json
          p_ip_address?: unknown
          p_privacy_policy_version: string
          p_terms_of_use_version: string
          p_user_agent?: string
        }
        Returns: boolean
      }
      record_user_agreement: {
        Args: {
          p_privacy_version: string
          p_terms_version: string
          p_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
