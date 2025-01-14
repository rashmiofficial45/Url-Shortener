import supabase from "@/lib/supabase";
type formDataTypes = {
  email: string;
  password: string;
};
export const login = async (formData: formDataTypes) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
  console.log(data);
  if (error) throw new Error(error.message);
  return data;
};

export const signup = async (formData: formDataTypes) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  console.log(data);
  if (error) throw new Error(error.message);
  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  console.log(data.session);
  if (!data.session) return null;
  if (error) throw new Error(error.message);
  return data.session;
};
