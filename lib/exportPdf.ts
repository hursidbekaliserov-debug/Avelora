import jsPDF from 'jspdf';
import { Itinerary } from './types';
import { formatPrice } from './currency';

export function exportItineraryToPdf(itinerary: Itinerary) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header background banner
  doc.setFillColor(23, 43, 37); // Deep forest green #172B25
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Gold accent line
  doc.setFillColor(198, 163, 106); // Champagne gold #C6A36A
  doc.rect(0, 42, pageWidth, 2, 'F');

  // Title
  doc.setTextColor(243, 231, 196); // Light gold
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('AVELORA', 18, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(223, 191, 133);
  doc.text('PREMIUM AI TRAVEL INTELLIGENCE • ITINERARY BRIEFING', 18, 25);

  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  const splitTitle = doc.splitTextToSize(itinerary.title, pageWidth - 36);
  doc.text(splitTitle, 18, 35);

  y = 54;

  // Metadata Box
  doc.setFillColor(248, 247, 242);
  doc.setDrawColor(198, 163, 106);
  doc.roundedRect(16, y, pageWidth - 32, 26, 3, 3, 'FD');

  doc.setTextColor(37, 42, 39);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Destination: ${itinerary.destinationName}`, 22, y + 8);
  doc.text(`Duration: ${itinerary.totalDays} Days`, 22, y + 16);
  doc.text(`Travelers: ${itinerary.travelersCount} (${itinerary.travelerStyle})`, 22, y + 23);

  doc.text(`Pace: ${itinerary.travelPace.toUpperCase()}`, 110, y + 8);
  doc.text(`Season: ${itinerary.recommendedSeason}`, 110, y + 16);
  doc.setTextColor(198, 163, 106);
  doc.text(`Est. Budget: ${formatPrice(itinerary.totalEstimatedBudgetUSD, 'USD')}`, 110, y + 23);

  y += 36;

  // Days Breakdown
  itinerary.days.forEach((day) => {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    // Day Header
    doc.setFillColor(23, 43, 37);
    doc.roundedRect(16, y, pageWidth - 32, 10, 2, 2, 'F');
    doc.setTextColor(223, 191, 133);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`DAY ${day.dayNumber}: ${day.title}`, 20, y + 7);

    y += 14;

    // Activities
    const slots = [
      { label: 'Morning', act: day.morning },
      { label: 'Afternoon', act: day.afternoon },
      { label: 'Evening', act: day.evening },
    ];

    slots.forEach(({ label, act }) => {
      if (y > 255) {
        doc.addPage();
        y = 20;
      }

      doc.setTextColor(198, 163, 106);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`[${label.toUpperCase()}${act.time ? ` • ${act.time}` : ''}]`, 20, y);

      doc.setTextColor(23, 43, 37);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(act.name, 48, y);

      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const descLines = doc.splitTextToSize(act.description, pageWidth - 70);
      doc.text(descLines, 48, y + 5);

      const descHeight = descLines.length * 4.2;
      y += 8 + descHeight;
    });

    if (day.localDishRecommendation) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(136, 104, 52);
      doc.text(`Culinary tip: ${day.localDishRecommendation}`, 20, y);
      y += 6;
    }

    y += 4;
  });

  // Footer on final page
  if (y > 260) {
    doc.addPage();
    y = 20;
  }
  y += 6;
  doc.setDrawColor(200, 200, 200);
  doc.line(16, y, pageWidth - 16, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('Generated via AVELORA AI Travel Platform • International Tourism Hackathon Uzbekistan', 18, y);
  doc.text('www.avelora.travel • Official Verified Travel Briefing', 18, y + 5);

  const filename = `${itinerary.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-avelora.pdf`;
  doc.save(filename);
}

