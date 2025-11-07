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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: Database["public"]["Enums"]["achievement_category"]
          created_at: string | null
          description: string
          description_georgian: string
          icon: string
          id: string
          name: string
          name_georgian: string
          rarity: Database["public"]["Enums"]["achievement_rarity"]
          requirement: number
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["achievement_category"]
          created_at?: string | null
          description: string
          description_georgian: string
          icon: string
          id?: string
          name: string
          name_georgian: string
          rarity?: Database["public"]["Enums"]["achievement_rarity"]
          requirement: number
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["achievement_category"]
          created_at?: string | null
          description?: string
          description_georgian?: string
          icon?: string
          id?: string
          name?: string
          name_georgian?: string
          rarity?: Database["public"]["Enums"]["achievement_rarity"]
          requirement?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      challenges: {
        Row: {
          created_at: string | null
          description: string
          description_georgian: string
          end_date: string
          id: string
          participants: number | null
          reward: number
          start_date: string
          target: number
          title: string
          title_georgian: string
          type: Database["public"]["Enums"]["challenge_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          description_georgian: string
          end_date: string
          id?: string
          participants?: number | null
          reward: number
          start_date: string
          target: number
          title: string
          title_georgian: string
          type: Database["public"]["Enums"]["challenge_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          description_georgian?: string
          end_date?: string
          id?: string
          participants?: number | null
          reward?: number
          start_date?: string
          target?: number
          title?: string
          title_georgian?: string
          type?: Database["public"]["Enums"]["challenge_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      eco_tips: {
        Row: {
          category: Database["public"]["Enums"]["ecotip_category"]
          content: string
          content_georgian: string
          created_at: string | null
          difficulty: Database["public"]["Enums"]["ecotip_difficulty"]
          icon: string
          id: string
          impact: Database["public"]["Enums"]["ecotip_impact"]
          title: string
          title_georgian: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["ecotip_category"]
          content: string
          content_georgian: string
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["ecotip_difficulty"]
          icon: string
          id?: string
          impact?: Database["public"]["Enums"]["ecotip_impact"]
          title: string
          title_georgian: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["ecotip_category"]
          content?: string
          content_georgian?: string
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["ecotip_difficulty"]
          icon?: string
          id?: string
          impact?: Database["public"]["Enums"]["ecotip_impact"]
          title?: string
          title_georgian?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ecobox_devices: {
        Row: {
          coordinates_lat: number | null
          coordinates_lng: number | null
          created_at: string | null
          current_capacity: number | null
          daily_collections: number | null
          id: string
          last_data_received: string | null
          location: string
          school_id: string
          status: Database["public"]["Enums"]["device_status"] | null
          total_capacity: number | null
          updated_at: string | null
        }
        Insert: {
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          current_capacity?: number | null
          daily_collections?: number | null
          id?: string
          last_data_received?: string | null
          location: string
          school_id: string
          status?: Database["public"]["Enums"]["device_status"] | null
          total_capacity?: number | null
          updated_at?: string | null
        }
        Update: {
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          current_capacity?: number | null
          daily_collections?: number | null
          id?: string
          last_data_received?: string | null
          location?: string
          school_id?: string
          status?: Database["public"]["Enums"]["device_status"] | null
          total_capacity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecobox_devices_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          icon: string | null
          id: string
          message: string
          message_georgian: string
          read: boolean | null
          title: string
          title_georgian: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          message: string
          message_georgian: string
          read?: boolean | null
          title: string
          title_georgian: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          message?: string
          message_georgian?: string
          read?: boolean | null
          title?: string
          title_georgian?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_submissions: {
        Row: {
          ecobox_id: string
          id: string
          papers_count: number
          submission_date: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          ecobox_id: string
          id?: string
          papers_count?: number
          submission_date?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          ecobox_id?: string
          id?: string
          papers_count?: number
          submission_date?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "paper_submissions_ecobox_id_fkey"
            columns: ["ecobox_id"]
            isOneToOne: false
            referencedRelation: "ecobox_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paper_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          class_id: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          joined_date: string | null
          last_active: string | null
          last_name: string
          level: number | null
          role: Database["public"]["Enums"]["user_role"]
          school_id: string | null
          streak: number | null
          total_papers: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          class_id?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          joined_date?: string | null
          last_active?: string | null
          last_name: string
          level?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          streak?: number | null
          total_papers?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          class_id?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          joined_date?: string | null
          last_active?: string | null
          last_name?: string
          level?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          streak?: number | null
          total_papers?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_class"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "school_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_profiles_school"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_classes: {
        Row: {
          created_at: string | null
          grade: number
          id: string
          name: string
          school_id: string
          student_count: number | null
          teacher_id: string | null
          teacher_name: string | null
          total_papers: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          grade: number
          id?: string
          name: string
          school_id: string
          student_count?: number | null
          teacher_id?: string | null
          teacher_name?: string | null
          total_papers?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          grade?: number
          id?: string
          name?: string
          school_id?: string
          student_count?: number | null
          teacher_id?: string | null
          teacher_name?: string | null
          total_papers?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_classes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          carbon_reduced: number | null
          city: string
          coordinates_lat: number | null
          coordinates_lng: number | null
          created_at: string | null
          id: string
          monthly_papers: number | null
          name: string
          ranking: number | null
          region: string
          saved_trees: number | null
          total_classes: number | null
          total_papers: number | null
          total_students: number | null
          updated_at: string | null
        }
        Insert: {
          carbon_reduced?: number | null
          city: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          id?: string
          monthly_papers?: number | null
          name: string
          ranking?: number | null
          region: string
          saved_trees?: number | null
          total_classes?: number | null
          total_papers?: number | null
          total_students?: number | null
          updated_at?: string | null
        }
        Update: {
          carbon_reduced?: number | null
          city?: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          id?: string
          monthly_papers?: number | null
          name?: string
          ranking?: number | null
          region?: string
          saved_trees?: number | null
          total_classes?: number | null
          total_papers?: number | null
          total_students?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_date: string | null
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_date?: string | null
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_date?: string | null
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed: boolean | null
          id: string
          joined_date: string | null
          progress: number | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean | null
          id?: string
          joined_date?: string | null
          progress?: number | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean | null
          id?: string
          joined_date?: string | null
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      achievement_category:
        | "recycling"
        | "streak"
        | "competition"
        | "education"
        | "special"
      achievement_rarity: "common" | "rare" | "epic" | "legendary"
      challenge_type: "daily" | "weekly" | "monthly" | "special"
      device_status: "online" | "offline" | "maintenance" | "full"
      ecotip_category:
        | "recycling"
        | "energy"
        | "water"
        | "transportation"
        | "general"
      ecotip_difficulty: "easy" | "medium" | "hard"
      ecotip_impact: "low" | "medium" | "high"
      leaderboard_type: "student" | "class" | "school"
      notification_type:
        | "achievement"
        | "challenge"
        | "ranking"
        | "system"
        | "educational"
      trend_type: "up" | "down" | "same"
      user_role: "student" | "teacher" | "admin"
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
    Enums: {
      achievement_category: [
        "recycling",
        "streak",
        "competition",
        "education",
        "special",
      ],
      achievement_rarity: ["common", "rare", "epic", "legendary"],
      challenge_type: ["daily", "weekly", "monthly", "special"],
      device_status: ["online", "offline", "maintenance", "full"],
      ecotip_category: [
        "recycling",
        "energy",
        "water",
        "transportation",
        "general",
      ],
      ecotip_difficulty: ["easy", "medium", "hard"],
      ecotip_impact: ["low", "medium", "high"],
      leaderboard_type: ["student", "class", "school"],
      notification_type: [
        "achievement",
        "challenge",
        "ranking",
        "system",
        "educational",
      ],
      trend_type: ["up", "down", "same"],
      user_role: ["student", "teacher", "admin"],
    },
  },
} as const
