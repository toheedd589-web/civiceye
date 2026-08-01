const supabase = require("../config/supabase");

// ======================================
// GET ALL COMPLAINTS
// ======================================
const getAllComplaints = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      count: data.length,
      complaints: data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ======================================
// UPDATE COMPLAINT STATUS
// ======================================
const updateComplaintStatus = async (req, res) => {
  try {

    const complaintId = req.params.id;
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "In Progress",
      "Resolved"
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const { data: complaint, error: fetchError } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", complaintId)
      .single();

    if (fetchError || !complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    const { data, error } = await supabase
      .from("complaints")
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq("id", complaintId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      message: "Complaint status updated",
      complaint: data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ======================================
// ASSIGN COMPLAINT TO OFFICER
// ======================================
const assignComplaint = async (req, res) => {
  try {

    const complaintId = req.params.id;
    const officerId = req.user.id;

    const { data: complaint, error: fetchError } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", complaintId)
      .single();

    if (fetchError || !complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    if (complaint.assigned_officer_id) {
      return res.status(400).json({
        success: false,
        message: "Complaint already assigned"
      });
    }

    const { data, error } = await supabase
      .from("complaints")
      .update({
        assigned_officer_id: officerId,
        assigned_at: new Date().toISOString(),
        status: "In Progress",
        updated_at: new Date().toISOString()
      })
      .eq("id", complaintId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      message: "Complaint assigned successfully",
      complaint: data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ======================================
// DASHBOARD STATISTICS
// ======================================
const getDashboardStats = async (req, res) => {
  try {

    const officerId = req.user.id;

    const { data, error } = await supabase
      .from("complaints")
      .select("status, priority, assigned_officer_id");

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    const stats = {
      totalComplaints: data.length,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      myAssigned: 0,
      highPriority: 0
    };

    data.forEach((complaint) => {

      if (complaint.status === "Pending")
        stats.pending++;

      if (complaint.status === "In Progress")
        stats.inProgress++;

      if (complaint.status === "Resolved")
        stats.resolved++;

      if (complaint.priority === "High")
        stats.highPriority++;

      if (complaint.assigned_officer_id === officerId)
        stats.myAssigned++;

    });

    return res.json({
      success: true,
      stats
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};
// ======================================
// GET MY ASSIGNED COMPLAINTS
// ======================================
const getMyAssignedComplaints = async (req, res) => {
  try {

    const officerId = req.user.id;

    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("assigned_officer_id", officerId)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      count: data.length,
      complaints: data
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};
// ======================================
// SEARCH COMPLAINTS
// ======================================
const searchComplaints = async (req, res) => {
  try {

    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .or(
        `title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,location.ilike.%${query}%`
      )
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      count: data.length,
      complaints: data
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};
// ======================================
// FILTER COMPLAINTS
// ======================================
const filterComplaints = async (req, res) => {

  try {

    const { status, category, priority } = req.query;

    let query = supabase
      .from("complaints")
      .select("*");

    if (status) {
      query = query.eq("status", status);
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (priority) {
      query = query.eq("priority", priority);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false
    });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      count: data.length,
      complaints: data
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }

};
// ======================================
// UPDATE COMPLAINT PRIORITY
// ======================================
const updateComplaintPriority = async (req, res) => {
  try {

    const complaintId = req.params.id;
    const { priority } = req.body;

    const allowedPriorities = [
      "Low",
      "Medium",
      "High",
      "Critical"
    ];

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority"
      });
    }

    // Check complaint exists
    const { data: complaint, error: fetchError } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", complaintId)
      .single();

    if (fetchError || !complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    // Update priority
    const { data, error } = await supabase
      .from("complaints")
      .update({
        priority,
        updated_at: new Date().toISOString()
      })
      .eq("id", complaintId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      message: "Complaint priority updated successfully",
      complaint: data
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};
module.exports = {
  getDashboardStats,
  getAllComplaints,
  getMyAssignedComplaints,
  searchComplaints,
  filterComplaints,
  updateComplaintStatus,
  updateComplaintPriority,
  assignComplaint
};