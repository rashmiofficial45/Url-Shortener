import supabase from "@/lib/supabase";
type formDataTypes = {
  email:string
  password:string
}
export const signup = async(formData:formDataTypes) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  console.log(data)
  if (error) throw new Error(error.message);
    return data;
}
