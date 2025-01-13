import supabase from "@/lib/supabase";
type formDataTypes = {
  email:string
  password:string
}
export const login = async(formData:formDataTypes) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
  console.log(data)
  if (error) throw new Error(error.message);
    return data;
}
