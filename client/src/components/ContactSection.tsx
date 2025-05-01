import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import GlitchText from '@/components/ui/glitch-text';
import { insertMessageSchema, InsertMessage } from '@shared/schema';
import { z } from 'zod';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitMutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you soon.",
        variant: "default",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    try {
      insertMessageSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      submitMutation.mutate(formData);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-deep-purple">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-neon-green mb-4">
            <GlitchText text="CONNECT WITH ME" />
          </h2>
          <div className="h-1 w-24 bg-neon-pink mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Ready to start a project or have questions? Reach out to me using any of these channels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-cyber-black/80 border border-neon-blue p-6 md:p-8 rounded-lg">
            <h3 className="font-future text-xl text-neon-blue mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-deep-purple/50 border ${errors.name ? 'border-neon-pink' : 'border-neon-blue/50'} rounded-md text-white focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink`}
                />
                {errors.name && <p className="mt-1 text-sm text-neon-pink">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-deep-purple/50 border ${errors.email ? 'border-neon-pink' : 'border-neon-blue/50'} rounded-md text-white focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink`}
                />
                {errors.email && <p className="mt-1 text-sm text-neon-pink">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-deep-purple/50 border ${errors.subject ? 'border-neon-pink' : 'border-neon-blue/50'} rounded-md text-white focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink`}
                />
                {errors.subject && <p className="mt-1 text-sm text-neon-pink">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-deep-purple/50 border ${errors.message ? 'border-neon-pink' : 'border-neon-blue/50'} rounded-md text-white focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink resize-none`}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-neon-pink">{errors.message}</p>}
              </div>
              <button 
                type="submit" 
                disabled={submitMutation.isPending}
                className="w-full px-6 py-3 bg-neon-green text-cyber-black font-future font-bold rounded-md hover:bg-neon-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cyber-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </span>
                ) : (
                  <>SEND MESSAGE <i className="fas fa-paper-plane ml-2"></i></>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-cyber-black/80 border border-neon-pink p-6 md:p-8 rounded-lg">
              <h3 className="font-future text-xl text-neon-pink mb-6">Direct Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neon-pink/20 text-neon-pink mt-1">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <span className="block text-gray-300 mb-1">Email</span>
                    <a 
                      href="mailto:martinsjoao1227@gmail.com" 
                      className="text-neon-pink hover:text-neon-blue transition-colors"
                    >
                      martinsjoao1227@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neon-green/20 text-neon-green mt-1">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <span className="block text-gray-300 mb-1">WhatsApp</span>
                    <a 
                      href="https://wa.me/5583999290376" 
                      className="text-neon-green hover:text-neon-blue transition-colors"
                    >
                      +55 83 999290376
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neon-blue/20 text-neon-blue mt-1">
                    <i className="fab fa-github"></i>
                  </div>
                  <div>
                    <span className="block text-gray-300 mb-1">GitHub</span>
                    <a 
                      href="https://github.com/jotavtech" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-neon-blue hover:text-neon-pink transition-colors"
                    >
                      github.com/jotavtech
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Availability Card */}
            <div className="bg-cyber-black/80 border border-neon-yellow p-6 md:p-8 rounded-lg">
              <h3 className="font-future text-xl text-neon-yellow mb-4">Current Availability</h3>
              <p className="text-gray-300 mb-6">
                I'm currently available for freelance projects and collaborations. My typical response time is within 24 hours.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Project Capacity</span>
                  <div className="w-32 h-3 bg-deep-purple rounded-full overflow-hidden">
                    <div className="h-full bg-neon-green rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Response Time</span>
                  <div className="w-32 h-3 bg-deep-purple rounded-full overflow-hidden">
                    <div className="h-full bg-neon-yellow rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="bg-cyber-black/80 border border-digital-orange p-6 rounded-lg">
              <h3 className="font-future text-xl text-digital-orange mb-4">Let's Connect</h3>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://github.com/jotavtech" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-deep-purple/50 text-neon-blue hover:bg-neon-blue hover:text-cyber-black transition-colors"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a 
                  href="https://wa.me/5583999290376" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-deep-purple/50 text-neon-green hover:bg-neon-green hover:text-cyber-black transition-colors"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
                <a 
                  href="mailto:martinsjoao1227@gmail.com" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-deep-purple/50 text-neon-pink hover:bg-neon-pink hover:text-cyber-black transition-colors"
                >
                  <i className="fas fa-envelope text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FF00FF_0%,_transparent_70%)] opacity-10"></div>
      </div>
    </section>
  );
};

export default ContactSection;
