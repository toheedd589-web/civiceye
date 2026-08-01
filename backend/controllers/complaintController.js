const supabase = require("../config/supabase");

// =============================
// CREATE COMPLAINT
// =============================
const createComplaint = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      title,
      description,
      category,
      location,
      image_url
    } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const { data, error } = await supabase
      .from("complaints")
      .insert([
        {
          user_id: userId,
          title,
          description,
          category,
          location,
          image_url
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint: data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// =============================
// GET MY COMPLAINTS
// =============================
const getMyComplaints = async (req, res) => {
  try {

    const userId = req.user.id;

    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
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

// =============================
// GET COMPLAINT BY ID
// =============================
const getComplaintById = async (req, res) => {
  try {

    const userId = req.user.id;
    const complaintId = req.params.id;

    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", complaintId)
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    return res.status(200).json({
      success: true,
      complaint: data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// =============================
// UPDATE COMPLAINT
// =============================
const updateComplaint = async (req, res) => {
  try {

    const userId = req.user.id;
    const complaintId = req.params.id;

    const {
      title,
      description,
      category,
      location,
      image_url
    } = req.body;

    const { data: complaint, error: fetchError } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", complaintId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    if (complaint.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending complaints can be updated"
      });
    }

    const { data, error } = await supabase
      .from("complaints")
      .update({
        title,
        description,
        category,
        location,
        image_url,
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

    return res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint: data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// =============================
// DELETE COMPLAINT
// =============================
const deleteComplaint = async (req, res) => {
  try {

    const userId = req.user.id;
    const complaintId = req.params.id;

    const { data: complaint, error: fetchError } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", complaintId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    if (complaint.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending complaints can be deleted"
      });
    }

    const { error } = await supabase
      .from("complaints")
      .delete()
      .eq("id", complaintId);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
};