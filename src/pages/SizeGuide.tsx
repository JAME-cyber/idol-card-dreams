
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SizeGuide = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-powder via-stone-lavender to-korean-gold/20">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-black mb-4 font-poppins">
              Size Guide
            </h1>
            <p className="text-lg text-stone-black/70 font-korean">
              Find your perfect fit with our international sizing chart
            </p>
          </div>

          {/* Size Chart */}
          <div className="korean-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-black mb-6 font-poppins text-center">
              International Size Chart
            </h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-stone-black">International</TableHead>
                    <TableHead className="font-bold text-stone-black">France (FR)</TableHead>
                    <TableHead className="font-bold text-stone-black">Korea (KR)</TableHead>
                    <TableHead className="font-bold text-stone-black">UK</TableHead>
                    <TableHead className="font-bold text-stone-black">US</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">XS</TableCell>
                    <TableCell>34</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">S</TableCell>
                    <TableCell>36</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">M</TableCell>
                    <TableCell>38</TableCell>
                    <TableCell>95</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">L</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">XL</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>105</TableCell>
                    <TableCell>14</TableCell>
                    <TableCell>10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">XXL</TableCell>
                    <TableCell>44</TableCell>
                    <TableCell>110</TableCell>
                    <TableCell>16</TableCell>
                    <TableCell>12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Additional Information */}
          <div className="korean-card p-8">
            <h3 className="text-xl font-bold text-stone-black mb-4 font-poppins">
              Sizing Notes
            </h3>
            <div className="space-y-3 text-stone-black/80 font-korean">
              <p>• All measurements are approximate and may vary slightly depending on the specific item.</p>
              <p>• If you're between sizes, we recommend choosing the larger size for a more comfortable fit.</p>
              <p>• For any sizing questions, please contact us at stone.idol@yahoo.com</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SizeGuide;
