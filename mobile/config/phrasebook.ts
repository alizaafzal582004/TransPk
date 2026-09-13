// TransPk — Offline Phrasebook
// Pre-translated emergency + tourist phrases (English → Urdu)
// Internet ke bagair kaam karta hai

export interface Phrase {
  en: string;
  ur: string;
}

export interface PhraseCategory {
  category: string;
  icon: string;
  phrases: Phrase[];
}

export const PHRASEBOOK: PhraseCategory[] = [
  {
    category: 'Emergency',
    icon: '🚨',
    phrases: [
      { en: 'Help me!', ur: 'میری مدد کرو!' },
      { en: 'Call the police.', ur: 'پولیس کو بلاؤ۔' },
      { en: 'I need a hospital.', ur: 'مجھے ہسپتال چاہیے۔' },
      { en: 'Call an ambulance.', ur: 'ایمبولینس بلاؤ۔' },
      { en: 'I am lost.', ur: 'میں راستہ بھول گیا ہوں۔' },
      { en: 'There is an emergency.', ur: 'ہنگامی صورتحال ہے۔' },
    ],
  },
  {
    category: 'Transport',
    icon: '🚕',
    phrases: [
      { en: 'Where is the bus station?', ur: 'بس اسٹیشن کہاں ہے؟' },
      { en: 'Please stop here.', ur: 'یہاں رک جائیں۔' },
      { en: 'How much is the fare?', ur: 'کرایہ کتنا ہے؟' },
      { en: 'Please take me to this address.', ur: 'مجھے اس پتے پر لے چلیں۔' },
      { en: 'How far is it?', ur: 'یہ کتنی دور ہے؟' },
    ],
  },
  {
    category: 'Hotel',
    icon: '🏨',
    phrases: [
      { en: 'I have a reservation.', ur: 'میری بکنگ ہے۔' },
      { en: 'Where is the bathroom?', ur: 'باتھ روم کہاں ہے؟' },
      { en: 'Do you have a room?', ur: 'کیا آپ کے پاس کمرہ ہے؟' },
      { en: 'The room is not clean.', ur: 'کمرہ صاف نہیں ہے۔' },
    ],
  },
  {
    category: 'Shopping',
    icon: '🛍️',
    phrases: [
      { en: 'How much does this cost?', ur: 'اس کی قیمت کتنی ہے؟' },
      { en: 'Can you reduce the price?', ur: 'کیا قیمت کم ہو سکتی ہے؟' },
      { en: 'That is too expensive.', ur: 'یہ بہت مہنگا ہے۔' },
      { en: 'I want to buy this.', ur: 'میں یہ خریدنا چاہتا ہوں۔' },
    ],
  },
  {
    category: 'Food',
    icon: '🍽️',
    phrases: [
      { en: 'I am hungry.', ur: 'مجھے بھوک لگی ہے۔' },
      { en: 'Water, please.', ur: 'پانی دیجیے۔' },
      { en: 'Is this vegetarian?', ur: 'کیا یہ سبزی والا ہے؟' },
      { en: 'The food is delicious.', ur: 'کھانا مزیدار ہے۔' },
      { en: 'Not too spicy, please.', ur: 'زیادہ مرچ نہ ڈالیں۔' },
    ],
  },
  {
    category: 'Directions',
    icon: '🧭',
    phrases: [
      { en: 'Where is this place?', ur: 'یہ جگہ کہاں ہے؟' },
      { en: 'Go straight.', ur: 'سیدھے جائیں۔' },
      { en: 'Turn left.', ur: 'بائیں مڑیں۔' },
      { en: 'Turn right.', ur: 'دائیں مڑیں۔' },
      { en: 'Is it near?', ur: 'کیا یہ قریب ہے؟' },
    ],
  },
];