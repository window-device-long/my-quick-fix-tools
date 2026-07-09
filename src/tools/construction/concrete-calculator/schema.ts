export const schema = {
  fields: [
    {
      name: "concrete_grade",
      label: "Concrete Grade",
      type: "select",
      options: [
       { label: "C10 (Bê tông lót)", value: "10" },
  { label: "C16 (Kết cấu đơn giản)", value: "16" },
  { label: "C20 (Nhà dân dụng - Móng)", value: "20" },
  { label: "C25 (Kết cấu chịu lực)", value: "25" },
  { label: "C30 (Nhà cao tầng/Dầm)", value: "30" },
  { label: "C40 (Công trình đặc biệt)", value: "40" },
            
      ]
    },
    {
      name: "reinforcement",
      label: "Use Reinforcement?",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      name: "safety_factor",
      label: "Safety Factor (%)",
      type: "slider",
      min: 0,
      max: 20
    }
  ]
};