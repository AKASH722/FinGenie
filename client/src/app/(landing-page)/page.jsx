import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Star, Zap } from 'lucide-react';

import { howItWorksData, testimonialsData } from '@/data/landing';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-10 md:py-16">
        <Badge className="mb-4" variant="outline">
          <Zap className="mr-1 h-3 w-3" /> New AI Features
        </Badge>
        <h1
          className="max-w-3xl text-center text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold tracking-tight mb-6">
          Manage Your Finances with <span className="text-primary">Intelligence</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-center">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="font-medium">
              Get Started <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <section id="howItWorks" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center flex flex-col items-center">
                <div
                  className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600 max-w-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 md:py-16">
        <div className="flex flex-col items-center">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by users</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their financial management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5  mx-auto">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="h-full max-w-lg">
                <CardHeader className="pb-2">
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-foreground font-medium">
                    {testimonial.text}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div
                      className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-xs font-medium text-primary">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}