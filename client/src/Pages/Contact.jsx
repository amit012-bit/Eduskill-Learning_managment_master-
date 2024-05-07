import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import toast from "react-hot-toast"
import { isEmail } from "../helpers/regexMatcher"
import axiosInstance from "../helpers/axiosInstance"


const Contact = () => {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }
        if (!isEmail(userInput.email)) {
            toast.error("Invalid email id!");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput)
            toast.promise(response, {
                loading: "Submitting your message",
                success: "Form submitted succesfully",
                error: "Failed to submit the form"
            })
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            toast.error("Operation failed...")
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">

                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input className="bg-transparent border px-2 py-1 rounded-sm" id="name" type="text" name="name" placeholder="Enter your name" onChange={handleInputChange} value={userInput.name} />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input className="bg-transparent border px-2 py-1 rounded-sm" id="email" type="email" name="email" placeholder="Enter your email" onChange={handleInputChange} value={userInput.email}/>
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40" id="message" name="message" placeholder="Enter your message" onChange={handleInputChange} value={userInput.message}/>
                    </div>

                    <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Contact
