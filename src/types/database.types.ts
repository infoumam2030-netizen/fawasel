/**
 * AUTO-GENERATED — do not edit by hand.
 * Regenerate with: node scripts/generate-db-types.mjs <postgres-url>
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      clients: {
        Row: {
          id: string;
          name: string;
          name_en: string | null;
          logo_url: string | null;
          website_url: string | null;
          industry: string | null;
          industry_en: string | null;
          description: string | null;
          description_en: string | null;
          order_index: number;
          is_featured: boolean;
          is_visible: boolean;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_en?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          industry?: string | null;
          industry_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          order_index?: number;
          is_featured?: boolean;
          is_visible?: boolean;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          industry?: string | null;
          industry_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          order_index?: number;
          is_featured?: boolean;
          is_visible?: boolean;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      faq: {
        Row: {
          id: string;
          question: string;
          question_en: string | null;
          answer: string;
          answer_en: string | null;
          order_index: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          question_en?: string | null;
          answer: string;
          answer_en?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          question_en?: string | null;
          answer?: string;
          answer_en?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      form_options: {
        Row: {
          id: string;
          group_key: string;
          value: string;
          label: string;
          label_en: string | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          group_key: string;
          value: string;
          label: string;
          label_en?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          group_key?: string;
          value?: string;
          label?: string;
          label_en?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      homepage_sections: {
        Row: {
          id: string;
          section_key: string;
          title: string | null;
          title_en: string | null;
          subtitle: string | null;
          subtitle_en: string | null;
          description: string | null;
          description_en: string | null;
          content: Json;
          image_url: string | null;
          is_visible: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          section_key: string;
          title?: string | null;
          title_en?: string | null;
          subtitle?: string | null;
          subtitle_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          content?: Json;
          image_url?: string | null;
          is_visible?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          section_key?: string;
          title?: string | null;
          title_en?: string | null;
          subtitle?: string | null;
          subtitle_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          content?: Json;
          image_url?: string | null;
          is_visible?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_sections_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      media: {
        Row: {
          id: string;
          file_name: string;
          storage_path: string;
          public_url: string;
          mime_type: string;
          file_size: number;
          width: number | null;
          height: number | null;
          alt_text: string | null;
          alt_text_en: string | null;
          folder: string;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          file_name: string;
          storage_path: string;
          public_url: string;
          mime_type: string;
          file_size: number;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          alt_text_en?: string | null;
          folder?: string;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          file_name?: string;
          storage_path?: string;
          public_url?: string;
          mime_type?: string;
          file_size?: number;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          alt_text_en?: string | null;
          folder?: string;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey";
            columns: ["uploaded_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      package_features: {
        Row: {
          id: string;
          package_id: string;
          feature_text: string;
          feature_text_en: string | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          package_id: string;
          feature_text: string;
          feature_text_en?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          feature_text?: string;
          feature_text_en?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "package_features_package_id_fkey";
            columns: ["package_id"];
            referencedRelation: "packages";
            referencedColumns: ["id"];
          },
        ];
      };
      package_services: {
        Row: {
          package_id: string;
          service_id: string;
        };
        Insert: {
          package_id: string;
          service_id: string;
        };
        Update: {
          package_id?: string;
          service_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "package_services_package_id_fkey";
            columns: ["package_id"];
            referencedRelation: "packages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "package_services_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      packages: {
        Row: {
          id: string;
          name: string;
          name_en: string | null;
          description: string | null;
          description_en: string | null;
          price: number | null;
          currency: string;
          billing_period: string | null;
          billing_period_en: string | null;
          cta_text: string | null;
          cta_text_en: string | null;
          badge: string | null;
          badge_en: string | null;
          featured: boolean;
          show_price: boolean;
          order_index: number;
          status: Database["public"]["Enums"]["content_status"];
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          name_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          price?: number | null;
          currency?: string;
          billing_period?: string | null;
          billing_period_en?: string | null;
          cta_text?: string | null;
          cta_text_en?: string | null;
          badge?: string | null;
          badge_en?: string | null;
          featured?: boolean;
          show_price?: boolean;
          order_index?: number;
          status?: Database["public"]["Enums"]["content_status"];
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          price?: number | null;
          currency?: string;
          billing_period?: string | null;
          billing_period_en?: string | null;
          cta_text?: string | null;
          cta_text_en?: string | null;
          badge?: string | null;
          badge_en?: string | null;
          featured?: boolean;
          show_price?: boolean;
          order_index?: number;
          status?: Database["public"]["Enums"]["content_status"];
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Relationships: [
        ];
      };
      portfolio_categories: {
        Row: {
          id: string;
          name: string;
          name_en: string | null;
          slug: string;
          description: string | null;
          description_en: string | null;
          order_index: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_en?: string | null;
          slug: string;
          description?: string | null;
          description_en?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string | null;
          slug?: string;
          description?: string | null;
          description_en?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      production_capabilities: {
        Row: {
          id: string;
          name: string;
          name_en: string | null;
          description: string | null;
          description_en: string | null;
          image_url: string | null;
          icon: string | null;
          order_index: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          icon?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          icon?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          avatar_url: string | null;
          role: Database["public"]["Enums"]["user_role"];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          email: string;
          avatar_url?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          media_id: string | null;
          image_url: string;
          alt_text: string | null;
          alt_text_en: string | null;
          caption: string | null;
          caption_en: string | null;
          order_index: number;
          is_featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          media_id?: string | null;
          image_url: string;
          alt_text?: string | null;
          alt_text_en?: string | null;
          caption?: string | null;
          caption_en?: string | null;
          order_index?: number;
          is_featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          media_id?: string | null;
          image_url?: string;
          alt_text?: string | null;
          alt_text_en?: string | null;
          caption?: string | null;
          caption_en?: string | null;
          order_index?: number;
          is_featured?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_images_media_fk";
            columns: ["media_id"];
            referencedRelation: "media";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_related: {
        Row: {
          project_id: string;
          related_project_id: string;
          order_index: number;
        };
        Insert: {
          project_id: string;
          related_project_id: string;
          order_index?: number;
        };
        Update: {
          project_id?: string;
          related_project_id?: string;
          order_index?: number;
        };
        Relationships: [
          {
            foreignKeyName: "project_related_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_related_related_project_id_fkey";
            columns: ["related_project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_results: {
        Row: {
          id: string;
          project_id: string;
          value: string;
          label: string;
          label_en: string | null;
          description: string | null;
          description_en: string | null;
          prefix: string | null;
          suffix: string | null;
          order_index: number;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          value: string;
          label: string;
          label_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          prefix?: string | null;
          suffix?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          value?: string;
          label?: string;
          label_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          prefix?: string | null;
          suffix?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_results_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_services: {
        Row: {
          project_id: string;
          service_id: string;
        };
        Insert: {
          project_id: string;
          service_id: string;
        };
        Update: {
          project_id?: string;
          service_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_services_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_services_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      project_slug_history: {
        Row: {
          id: string;
          project_id: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          slug?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_slug_history_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          title_en: string | null;
          slug: string;
          client_name: string | null;
          industry: string | null;
          industry_en: string | null;
          category_id: string | null;
          short_description: string;
          short_description_en: string | null;
          full_description: string | null;
          full_description_en: string | null;
          challenge: string | null;
          challenge_en: string | null;
          strategy: string | null;
          strategy_en: string | null;
          execution: string | null;
          execution_en: string | null;
          cover_image_url: string | null;
          year: number | null;
          featured: boolean;
          order_index: number;
          status: Database["public"]["Enums"]["content_status"];
          seo_title: string | null;
          seo_title_en: string | null;
          seo_description: string | null;
          seo_description_en: string | null;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
          published_at: string | null;
          created_by: string | null;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          title_en?: string | null;
          slug: string;
          client_name?: string | null;
          industry?: string | null;
          industry_en?: string | null;
          category_id?: string | null;
          short_description: string;
          short_description_en?: string | null;
          full_description?: string | null;
          full_description_en?: string | null;
          challenge?: string | null;
          challenge_en?: string | null;
          strategy?: string | null;
          strategy_en?: string | null;
          execution?: string | null;
          execution_en?: string | null;
          cover_image_url?: string | null;
          year?: number | null;
          featured?: boolean;
          order_index?: number;
          status?: Database["public"]["Enums"]["content_status"];
          seo_title?: string | null;
          seo_title_en?: string | null;
          seo_description?: string | null;
          seo_description_en?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          title_en?: string | null;
          slug?: string;
          client_name?: string | null;
          industry?: string | null;
          industry_en?: string | null;
          category_id?: string | null;
          short_description?: string;
          short_description_en?: string | null;
          full_description?: string | null;
          full_description_en?: string | null;
          challenge?: string | null;
          challenge_en?: string | null;
          strategy?: string | null;
          strategy_en?: string | null;
          execution?: string | null;
          execution_en?: string | null;
          cover_image_url?: string | null;
          year?: number | null;
          featured?: boolean;
          order_index?: number;
          status?: Database["public"]["Enums"]["content_status"];
          seo_title?: string | null;
          seo_title_en?: string | null;
          seo_description?: string | null;
          seo_description_en?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "portfolio_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      quote_request_notes: {
        Row: {
          id: string;
          quote_request_id: string;
          user_id: string | null;
          note: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote_request_id: string;
          user_id?: string | null;
          note: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote_request_id?: string;
          user_id?: string | null;
          note?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quote_request_notes_quote_request_id_fkey";
            columns: ["quote_request_id"];
            referencedRelation: "quote_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quote_request_notes_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      quote_request_status_history: {
        Row: {
          id: string;
          quote_request_id: string;
          old_status: Database["public"]["Enums"]["quote_status"] | null;
          new_status: Database["public"]["Enums"]["quote_status"];
          changed_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote_request_id: string;
          old_status?: Database["public"]["Enums"]["quote_status"] | null;
          new_status: Database["public"]["Enums"]["quote_status"];
          changed_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote_request_id?: string;
          old_status?: Database["public"]["Enums"]["quote_status"] | null;
          new_status?: Database["public"]["Enums"]["quote_status"];
          changed_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quote_request_status_history_changed_by_fkey";
            columns: ["changed_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quote_request_status_history_quote_request_id_fkey";
            columns: ["quote_request_id"];
            referencedRelation: "quote_requests";
            referencedColumns: ["id"];
          },
        ];
      };
      quote_requests: {
        Row: {
          id: string;
          request_number: string;
          name: string;
          company_name: string | null;
          phone: string;
          email: string | null;
          service_id: string | null;
          service_name_snapshot: string | null;
          package_id: string | null;
          package_name_snapshot: string | null;
          budget: string | null;
          project_details: string;
          expected_start_date: string | null;
          preferred_contact_method: string;
          contact_method_group: string;
          budget_group: string;
          status: Database["public"]["Enums"]["quote_status"];
          assigned_to: string | null;
          source: string | null;
          landing_page: string | null;
          referrer: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_term: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          request_number: string;
          name: string;
          company_name?: string | null;
          phone: string;
          email?: string | null;
          service_id?: string | null;
          service_name_snapshot?: string | null;
          package_id?: string | null;
          package_name_snapshot?: string | null;
          budget?: string | null;
          project_details: string;
          expected_start_date?: string | null;
          preferred_contact_method?: string;
          contact_method_group?: string;
          budget_group?: string;
          status?: Database["public"]["Enums"]["quote_status"];
          assigned_to?: string | null;
          source?: string | null;
          landing_page?: string | null;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          request_number?: string;
          name?: string;
          company_name?: string | null;
          phone?: string;
          email?: string | null;
          service_id?: string | null;
          service_name_snapshot?: string | null;
          package_id?: string | null;
          package_name_snapshot?: string | null;
          budget?: string | null;
          project_details?: string;
          expected_start_date?: string | null;
          preferred_contact_method?: string;
          contact_method_group?: string;
          budget_group?: string;
          status?: Database["public"]["Enums"]["quote_status"];
          assigned_to?: string | null;
          source?: string | null;
          landing_page?: string | null;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "quote_requests_assigned_to_fkey";
            columns: ["assigned_to"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quote_requests_budget_fk";
            columns: ["budget_group","budget"];
            referencedRelation: "form_options";
            referencedColumns: ["group_key","value"];
          },
          {
            foreignKeyName: "quote_requests_contact_method_fk";
            columns: ["contact_method_group","preferred_contact_method"];
            referencedRelation: "form_options";
            referencedColumns: ["group_key","value"];
          },
          {
            foreignKeyName: "quote_requests_package_id_fkey";
            columns: ["package_id"];
            referencedRelation: "packages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quote_requests_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      seo_metadata: {
        Row: {
          id: string;
          entity_type: string;
          entity_id: string | null;
          entity_key: string | null;
          seo_title: string | null;
          seo_title_en: string | null;
          seo_description: string | null;
          seo_description_en: string | null;
          og_title: string | null;
          og_title_en: string | null;
          og_description: string | null;
          og_description_en: string | null;
          og_image_url: string | null;
          canonical_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          entity_type: string;
          entity_id?: string | null;
          entity_key?: string | null;
          seo_title?: string | null;
          seo_title_en?: string | null;
          seo_description?: string | null;
          seo_description_en?: string | null;
          og_title?: string | null;
          og_title_en?: string | null;
          og_description?: string | null;
          og_description_en?: string | null;
          og_image_url?: string | null;
          canonical_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          entity_type?: string;
          entity_id?: string | null;
          entity_key?: string | null;
          seo_title?: string | null;
          seo_title_en?: string | null;
          seo_description?: string | null;
          seo_description_en?: string | null;
          og_title?: string | null;
          og_title_en?: string | null;
          og_description?: string | null;
          og_description_en?: string | null;
          og_image_url?: string | null;
          canonical_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      service_subservices: {
        Row: {
          id: string;
          service_id: string;
          name: string;
          name_en: string | null;
          description: string | null;
          description_en: string | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          name: string;
          name_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;
          name?: string;
          name_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "service_subservices_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      services: {
        Row: {
          id: string;
          title: string;
          title_en: string | null;
          slug: string;
          short_description: string;
          short_description_en: string | null;
          description: string | null;
          description_en: string | null;
          image_url: string | null;
          icon: string | null;
          order_index: number;
          status: Database["public"]["Enums"]["content_status"];
          is_featured: boolean;
          seo_title: string | null;
          seo_title_en: string | null;
          seo_description: string | null;
          seo_description_en: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
          created_by: string | null;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          title_en?: string | null;
          slug: string;
          short_description: string;
          short_description_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          icon?: string | null;
          order_index?: number;
          status?: Database["public"]["Enums"]["content_status"];
          is_featured?: boolean;
          seo_title?: string | null;
          seo_title_en?: string | null;
          seo_description?: string | null;
          seo_description_en?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          title_en?: string | null;
          slug?: string;
          short_description?: string;
          short_description_en?: string | null;
          description?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          icon?: string | null;
          order_index?: number;
          status?: Database["public"]["Enums"]["content_status"];
          is_featured?: boolean;
          seo_title?: string | null;
          seo_title_en?: string | null;
          seo_description?: string | null;
          seo_description_en?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "services_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "services_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: {
          id: string;
          singleton: boolean;
          brand_name: string;
          brand_name_en: string | null;
          tagline: string | null;
          tagline_en: string | null;
          phone: string | null;
          whatsapp: string | null;
          email: string | null;
          address: string | null;
          address_en: string | null;
          working_hours: string | null;
          working_hours_en: string | null;
          google_maps_url: string | null;
          logo_url: string | null;
          favicon_url: string | null;
          footer_text: string | null;
          footer_text_en: string | null;
          copyright_text: string | null;
          copyright_text_en: string | null;
          default_seo_title: string | null;
          default_seo_title_en: string | null;
          default_seo_description: string | null;
          default_seo_description_en: string | null;
          default_og_image_url: string | null;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          singleton?: boolean;
          brand_name?: string;
          brand_name_en?: string | null;
          tagline?: string | null;
          tagline_en?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          address?: string | null;
          address_en?: string | null;
          working_hours?: string | null;
          working_hours_en?: string | null;
          google_maps_url?: string | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          footer_text?: string | null;
          footer_text_en?: string | null;
          copyright_text?: string | null;
          copyright_text_en?: string | null;
          default_seo_title?: string | null;
          default_seo_title_en?: string | null;
          default_seo_description?: string | null;
          default_seo_description_en?: string | null;
          default_og_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          singleton?: boolean;
          brand_name?: string;
          brand_name_en?: string | null;
          tagline?: string | null;
          tagline_en?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          address?: string | null;
          address_en?: string | null;
          working_hours?: string | null;
          working_hours_en?: string | null;
          google_maps_url?: string | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          footer_text?: string | null;
          footer_text_en?: string | null;
          copyright_text?: string | null;
          copyright_text_en?: string | null;
          default_seo_title?: string | null;
          default_seo_title_en?: string | null;
          default_seo_description?: string | null;
          default_seo_description_en?: string | null;
          default_og_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "site_settings_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      social_links: {
        Row: {
          id: string;
          platform: string;
          url: string;
          label: string;
          label_en: string | null;
          icon: string | null;
          order_index: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          platform: string;
          url: string;
          label: string;
          label_en?: string | null;
          icon?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          platform?: string;
          url?: string;
          label?: string;
          label_en?: string | null;
          icon?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      statistics: {
        Row: {
          id: string;
          label: string;
          label_en: string | null;
          value: number;
          prefix: string | null;
          suffix: string | null;
          description: string | null;
          description_en: string | null;
          icon: string | null;
          order_index: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          label_en?: string | null;
          value: number;
          prefix?: string | null;
          suffix?: string | null;
          description?: string | null;
          description_en?: string | null;
          icon?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          label_en?: string | null;
          value?: number;
          prefix?: string | null;
          suffix?: string | null;
          description?: string | null;
          description_en?: string | null;
          icon?: string | null;
          order_index?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          company_name: string | null;
          company_name_en: string | null;
          job_title: string | null;
          job_title_en: string | null;
          profile_image_url: string | null;
          company_logo_url: string | null;
          rating: number | null;
          testimonial_text: string;
          testimonial_text_en: string | null;
          project_id: string | null;
          order_index: number;
          featured: boolean;
          status: Database["public"]["Enums"]["content_status"];
          is_demo: boolean;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          client_name: string;
          company_name?: string | null;
          company_name_en?: string | null;
          job_title?: string | null;
          job_title_en?: string | null;
          profile_image_url?: string | null;
          company_logo_url?: string | null;
          rating?: number | null;
          testimonial_text: string;
          testimonial_text_en?: string | null;
          project_id?: string | null;
          order_index?: number;
          featured?: boolean;
          status?: Database["public"]["Enums"]["content_status"];
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          client_name?: string;
          company_name?: string | null;
          company_name_en?: string | null;
          job_title?: string | null;
          job_title_en?: string | null;
          profile_image_url?: string | null;
          company_logo_url?: string | null;
          rating?: number | null;
          testimonial_text?: string;
          testimonial_text_en?: string | null;
          project_id?: string | null;
          order_index?: number;
          featured?: boolean;
          status?: Database["public"]["Enums"]["content_status"];
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      content_status: "draft" | "published" | "archived";
      quote_status: "new" | "contacted" | "qualified" | "proposal_sent" | "won" | "closed";
      user_role: "owner" | "editor" | "sales" | "designer";
    };
    CompositeTypes: Record<never, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Update"];
export type Enums<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T];
