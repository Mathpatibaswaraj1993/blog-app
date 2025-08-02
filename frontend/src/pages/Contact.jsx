import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkedAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c923edab-f877-482b-a88e-548ba0596289",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    console.log(userInfo);

    try {
      await axios.post("https://api.web3forms.com/submit", userInfo, {});
      toast.success("Message sent successfully! ✅"); // ✅ Success toast
    } catch (error) {
      console.error(
        "Submission error:",
        error?.response?.data || error.message
      );
      toast.error("An error occurred while sending the message ❌"); // ✅ Error toast
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-teal-800">
      <div className="max-w-4xl w-full space-y-8 p-10 rounded-lg shadow-lg bg-orange-400">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact US</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring focus:ring-green-500"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring focus:ring-green-500"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring focus:ring-green-500"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 duration-300"
                >
                  send Message
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-red-500" />
                <span>+91 7760919614</span>
              </li>

              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-pink-500" />
                <span>help@solution.com</span>
              </li>

              <li className="flex items-center space-x-2">
                <FaMapMarkedAlt className="text-green-500" />
                <span>Pune, Bengaluru, Hyderabad</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
