import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="border py-10 bg-gray-500">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-start">
            <h1 className="text-lg font-semibold mb-4">Products</h1>
            <ul className="space-y-2">
              <li>Flutter</li>
              <li>React</li>
              <li>Android</li>
              <li>iOS</li>
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h1 className="text-lg font-semibold mb-4">Design to code</h1>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-blue-700">
                Figma plugin
              </li>
              <li className="text-gray-400 hover:text-blue-700">Templates</li>
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h1 className="text-lg font-semibold mb-4">Comparison</h1>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-blue-700">
                DhiWise vs Anima
              </li>
              <li className="text-gray-400 hover:text-blue-700">
                DhiWise vs Appsmith
              </li>
              <li className="text-gray-400 hover:text-blue-700">
                DhiWise vs FlutterFlow
              </li>
              <li className="text-gray-400 hover:text-white">
                DhiWise vs Monday Hero
              </li>
              <li className="text-gray-400 hover:text-blue-700">
                DhiWise vs Retool
              </li>
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h1 className="text-lg font-semibold mb-4">Company</h1>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-700">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-700">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-700">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-700">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center bg-teal-600">
        <div className="text-xl font-semibold hidden md:flex">
          Cilli <span className="text-blue-700 font-bold">BLog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2025 DhiWise PVT LTD. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-4 flex">
          <a href="#">
            <FaGithub className="h-6" />
          </a>
          <a href="#">
            <BsYoutube className="h-6" />
          </a>
          <a href="#">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
