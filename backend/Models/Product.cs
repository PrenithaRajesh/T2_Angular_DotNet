namespace Backend.Models{
    public class Product{
        public int PId { get; set; }
        public string PName { get; set; } = "";
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; } = "";
        public bool isPremium { get; set; }
    }
}