const Url = require("../models/urls").default;

// Generate short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate input
    if (!originalUrl) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    // Validate URL protocol
    let parsedUrl;

    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return res.status(400).json({
        message: "Invalid URL",
      });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        message: "Only HTTP and HTTPS URLs are allowed",
      });
    }

    // Generate unique short code
    const { nanoid } = await import("nanoid");
    const shortCode = nanoid(6);

    // Save to database
    const newUrl = await Url.create({
      originalUrl: parsedUrl.toString(),
      code: shortCode,
    });

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    return res.status(201).json({
      message: "Short URL created successfully",
      originalUrl: newUrl.originalUrl,
      shortUrl,
      code: shortCode,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Redirect to original URL
exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ code: shortCode });

    if (!url) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    // Redirect
    return res.redirect(302, url.originalUrl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
