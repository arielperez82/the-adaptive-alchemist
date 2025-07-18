create table "public"."email_confirmations" (
    "id" uuid not null default gen_random_uuid(),
    "subscription_id" uuid,
    "token" uuid not null default gen_random_uuid(),
    "purpose" character varying(50) not null default 'subscription_confirm'::character varying,
    "expires_at" timestamp without time zone not null,
    "used_at" timestamp without time zone,
    "created_at" timestamp without time zone default now(),
    "attempt_count" integer default 0
);


alter table "public"."email_confirmations" enable row level security;

create table "public"."newsletter_sends" (
    "id" uuid not null default gen_random_uuid(),
    "sent_at" timestamp with time zone default now(),
    "article_slug" text,
    "broadcast_id" text
);


alter table "public"."newsletter_sends" enable row level security;

create table "public"."subscription_attempts" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "ip_address" text,
    "created_at" timestamp with time zone default now()
);


alter table "public"."subscription_attempts" enable row level security;

create table "public"."subscriptions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "status" character varying(50) not null default 'pending'::character varying,
    "subscribed_at" timestamp with time zone default now(),
    "confirmed_at" timestamp with time zone,
    "unsubscribed_at" timestamp with time zone
);


alter table "public"."subscriptions" enable row level security;

create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "email" character varying(255) not null,
    "first_name" character varying(100) not null,
    "last_name" character varying(100),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX email_confirmations_pkey ON public.email_confirmations USING btree (id);

CREATE UNIQUE INDEX email_confirmations_token_key ON public.email_confirmations USING btree (token);

CREATE INDEX idx_email_confirmations_expires_at ON public.email_confirmations USING btree (expires_at);

CREATE INDEX idx_email_confirmations_subscription_id ON public.email_confirmations USING btree (subscription_id);

CREATE INDEX idx_email_confirmations_token ON public.email_confirmations USING btree (token);

CREATE INDEX idx_subscription_attempts_email_created ON public.subscription_attempts USING btree (email, created_at);

CREATE INDEX idx_subscriptions_status ON public.subscriptions USING btree (status);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions USING btree (user_id);

CREATE INDEX idx_subscriptions_unsubscribed_at ON public.subscriptions USING btree (unsubscribed_at); 

CREATE INDEX idx_users_email ON public.users USING btree (email);

CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."email_confirmations" add constraint "email_confirmations_pkey" PRIMARY KEY using index "email_confirmations_pkey";

alter table "public"."subscriptions" add constraint "subscriptions_pkey" PRIMARY KEY using index "subscriptions_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."email_confirmations" add constraint "email_confirmations_subscription_id_fkey" FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE not valid;

alter table "public"."email_confirmations" validate constraint "email_confirmations_subscription_id_fkey";

alter table "public"."email_confirmations" add constraint "email_confirmations_token_key" UNIQUE using index "email_confirmations_token_key";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_user_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

grant delete on table "public"."email_confirmations" to "anon";

grant insert on table "public"."email_confirmations" to "anon";

grant references on table "public"."email_confirmations" to "anon";

grant select on table "public"."email_confirmations" to "anon";

grant trigger on table "public"."email_confirmations" to "anon";

grant truncate on table "public"."email_confirmations" to "anon";

grant update on table "public"."email_confirmations" to "anon";

grant delete on table "public"."email_confirmations" to "authenticated";

grant insert on table "public"."email_confirmations" to "authenticated";

grant references on table "public"."email_confirmations" to "authenticated";

grant select on table "public"."email_confirmations" to "authenticated";

grant trigger on table "public"."email_confirmations" to "authenticated";

grant truncate on table "public"."email_confirmations" to "authenticated";

grant update on table "public"."email_confirmations" to "authenticated";

grant delete on table "public"."email_confirmations" to "service_role";

grant insert on table "public"."email_confirmations" to "service_role";

grant references on table "public"."email_confirmations" to "service_role";

grant select on table "public"."email_confirmations" to "service_role";

grant trigger on table "public"."email_confirmations" to "service_role";

grant truncate on table "public"."email_confirmations" to "service_role";

grant update on table "public"."email_confirmations" to "service_role";

grant delete on table "public"."newsletter_sends" to "anon";

grant insert on table "public"."newsletter_sends" to "anon";

grant references on table "public"."newsletter_sends" to "anon";

grant select on table "public"."newsletter_sends" to "anon";

grant trigger on table "public"."newsletter_sends" to "anon";

grant truncate on table "public"."newsletter_sends" to "anon";

grant update on table "public"."newsletter_sends" to "anon";

grant delete on table "public"."newsletter_sends" to "authenticated";

grant insert on table "public"."newsletter_sends" to "authenticated";

grant references on table "public"."newsletter_sends" to "authenticated";

grant select on table "public"."newsletter_sends" to "authenticated";

grant trigger on table "public"."newsletter_sends" to "authenticated";

grant truncate on table "public"."newsletter_sends" to "authenticated";

grant update on table "public"."newsletter_sends" to "authenticated";

grant delete on table "public"."newsletter_sends" to "service_role";

grant insert on table "public"."newsletter_sends" to "service_role";

grant references on table "public"."newsletter_sends" to "service_role";

grant select on table "public"."newsletter_sends" to "service_role";

grant trigger on table "public"."newsletter_sends" to "service_role";

grant truncate on table "public"."newsletter_sends" to "service_role";

grant update on table "public"."newsletter_sends" to "service_role";

grant delete on table "public"."subscription_attempts" to "anon";

grant insert on table "public"."subscription_attempts" to "anon";

grant references on table "public"."subscription_attempts" to "anon";

grant select on table "public"."subscription_attempts" to "anon";

grant trigger on table "public"."subscription_attempts" to "anon";

grant truncate on table "public"."subscription_attempts" to "anon";

grant update on table "public"."subscription_attempts" to "anon";

grant delete on table "public"."subscription_attempts" to "authenticated";

grant insert on table "public"."subscription_attempts" to "authenticated";

grant references on table "public"."subscription_attempts" to "authenticated";

grant select on table "public"."subscription_attempts" to "authenticated";

grant trigger on table "public"."subscription_attempts" to "authenticated";

grant truncate on table "public"."subscription_attempts" to "authenticated";

grant update on table "public"."subscription_attempts" to "authenticated";

grant delete on table "public"."subscription_attempts" to "service_role";

grant insert on table "public"."subscription_attempts" to "service_role";

grant references on table "public"."subscription_attempts" to "service_role";

grant select on table "public"."subscription_attempts" to "service_role";

grant trigger on table "public"."subscription_attempts" to "service_role";

grant truncate on table "public"."subscription_attempts" to "service_role";

grant update on table "public"."subscription_attempts" to "service_role";

grant delete on table "public"."subscriptions" to "anon";

grant insert on table "public"."subscriptions" to "anon";

grant references on table "public"."subscriptions" to "anon";

grant select on table "public"."subscriptions" to "anon";

grant trigger on table "public"."subscriptions" to "anon";

grant truncate on table "public"."subscriptions" to "anon";

grant update on table "public"."subscriptions" to "anon";

grant delete on table "public"."subscriptions" to "authenticated";

grant insert on table "public"."subscriptions" to "authenticated";

grant references on table "public"."subscriptions" to "authenticated";

grant select on table "public"."subscriptions" to "authenticated";

grant trigger on table "public"."subscriptions" to "authenticated";

grant truncate on table "public"."subscriptions" to "authenticated";

grant update on table "public"."subscriptions" to "authenticated";

grant delete on table "public"."subscriptions" to "service_role";

grant insert on table "public"."subscriptions" to "service_role";

grant references on table "public"."subscriptions" to "service_role";

grant select on table "public"."subscriptions" to "service_role";

grant trigger on table "public"."subscriptions" to "service_role";

grant truncate on table "public"."subscriptions" to "service_role";

grant update on table "public"."subscriptions" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Allow service role full access"
on "public"."email_confirmations"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Allow service role full access"
on "public"."newsletter_sends"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Allow service role full access"
on "public"."subscription_attempts"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Allow service role full access"
on "public"."subscriptions"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Allow service role full access"
on "public"."users"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));