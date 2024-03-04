"use client";
import { cn, supabase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  page: "login" | "signup";
}

export function UserAuthForm({ page, className, ...props }: UserAuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  async function login() {
    if (showPasswordField) {
      if (!email || !password) {
        toast.error("Email og adgangskode skal udfyldes");
        return;
      }
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast("Forkert email eller adgangskode", {
            description: "Prøv igen eller log ind med login-link i stedet.",
          });
        } else if (error.message.includes("Email not confirmed")) {
          toast("Email er ikke bekræftet", {
            description:
              "Tjek din email for et bekræftelses-link eller log ind med login-link.",
          });
        } else {
          toast.error(error.message);
        }
        setLoading(false);
      } else {
        setLoading(false);
        window.location.href = "/dashboard/campaigns";
      }
    } else {
      if (!email) {
        toast.error("Email skal udfyldes");
        return;
      }
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + "/dashboard/campaigns",
          shouldCreateUser: false,
        },
      });

      if (error) {
        if (error.message.includes("Signups not allowed for otp")) {
          toast.error("En konto med denne email findes ikke");
        } else if (
          error.message.includes(
            "For security purposes, you can only request this"
          )
        ) {
          toast.error("Vent venligst 1 minut før du prøver igen");
        } else {
          console.error(error);
          toast.error(error.message);
        }
        setLoading(false);
      } else {
        toast.success("Tjek din email for et login-link");
        setLoading(false);
        setEmail("");
      }
    }
  }

  async function signup() {
    if (!email || !password || !firstName || !lastName || !company) {
      toast.error("Alle felter skal udfyldes");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      if (
        error.message.includes(
          "For security purposes, you can only request this"
        )
      ) {
        toast.error("Vent venligst 1 minut før du prøver igen");
        setLoading(false);
      } else {
        toast.error(error.message);
        setLoading(false);
      }
    } else if (data.user?.identities?.length === 0) {
      toast.error("Bruger eksisterer allerede med denne email");
      setLoading(false);
    } else {
      console.log(data);
      toast.success("Tjek din email for et bekræftelses-link");
      setLoading(false);
      setFirstName("");
      setLastName("");
      setCompany("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          {page === "login" ? (
            <>
              <Input
                placeholder="name@example.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {showPasswordField && (
                <Input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              )}
            </>
          ) : (
            <>
              <Input
                placeholder="Fornavn"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <Input
                placeholder="Efternavn"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <Input
                placeholder="Virksomhed"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
              />
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                placeholder="Adgangskode"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </>
          )}
        </div>
        {page === "login" ? (
          <Button onClick={login} disabled={loading}>
            {loading ? "Tænker..." : "Log ind"}
          </Button>
        ) : (
          <Button onClick={signup} disabled={loading}>
            {loading ? "Tænker..." : "Opret konto"}
          </Button>
        )}
      </div>
      {page === "login" && showPasswordField === true && (
        <p className="px-8 text-center text-sm text-muted-foreground">
          <button onClick={() => setShowPasswordField(false)}>
            Jeg ønsker at logge ind med login-link
          </button>
        </p>
      )}
      {page === "login" && showPasswordField === false && (
        <p className="px-8 text-center text-sm text-muted-foreground">
          <button onClick={() => setShowPasswordField(true)}>
            Jeg ønsker at logge ind med adgangskode
          </button>
        </p>
      )}
    </div>
  );
}
