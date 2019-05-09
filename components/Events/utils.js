const TYPE_COLORS = {
  company_presentation: '#A1C34A',
  lunch_presentation: '#A1C34A',
  course: '#52B0EC',
  kid_event: '#EEEEEE',
  party: '#FCD748',
  social: '#B11C11',
  event: '#B11C11',
  other: '#EEEEEE'
};

export const colorForEvent = eventType => {
  return TYPE_COLORS[eventType] || TYPE_COLORS['other'];
};
