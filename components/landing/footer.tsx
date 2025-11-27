"use client";

import Link from "next/link";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import Container from "@/components/shared/container";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-t border-purple-800/30 py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex-1">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-400 bg-clip-text text-transparent mb-2">
              Texura AI
            </h3>
            <p className="text-sm text-gray-300 max-w-md">
              Experience the power of AI-generated imagery. Create stunning visuals from simple text prompts in seconds.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-3">Connect With Me</h4>
            <div className="flex items-center gap-4">
              <Link 
                href="https://github.com/erdalinceler" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >
                <AiOutlineGithub className="w-7 h-7" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/erdal-inceler/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >
                <AiOutlineLinkedin className="w-7 h-7" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-purple-800/30 text-center">
          <p className="text-sm text-gray-300">
            Developed with ❤️ by{" "}
            <Link 
              href="https://github.com/erdalinceler"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition-colors font-medium"
            >
              Erdal İnceler
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
