   status: { 
        type: String, 
        enum: ["Pending", "Confirmed", "Canceled"], 
        default: "Pending" 
      }
    }, { timestamps: true });
    
    module.exports = mongoose.model("Booking", bookingSchema);
