password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["Standard User", "Organizer", "Admin"], 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
