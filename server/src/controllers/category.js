import Category from "../models/Category";
import categoryValidator from "../validations/category";

export const getAll = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };
    const data = await Category.paginate({}, options);
    if (!data || data.length === 0) {
      throw new Error("Failed!");
    }
    return res.status(200).json({
      message: "Success",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findById(id);
    if (!data) {
      throw new Error("Failed!");
    }
    return res.status(200).json({
      message: "Success",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = categoryValidator.validate(body, { abortEarly: true });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const data = await Category.findByIdAndUpdate(id, body, { new: true });
    if (!data) {
      throw new Error("Failed!");
    }
    return res.status(200).json({
      message: "Success!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = categoryValidator.validate(body, { abortEarly: true });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    const data = await Category.create(body);
    if (!data) {
      throw new Error("Failed!");
    }
    return res.status(200).json({
      message: "Success",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findByIdAndDelete(id);
    if (!data) {
      throw new Error("Failed!");
    }
    return res.status(200).json({
      message: "Success!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
