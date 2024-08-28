import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  return (
    <section className="p-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 border border-gray-300 rounded-lg shadow-md">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
