export function ensureProductExists(product) {
  if (!product) {
    throw new Error("Product not found");
  }
}

export function ensureEstablishmentOwnership(establishment) {
  if (!establishment) {
    throw new Error("Invalid establishment for this user");
  }
}

export function ensureImmutableFields(data) {
  const forbiddenFields = [
    "sku",
    "barcode",
    "stock_quantity",
    "establishment_id",
    "category_id",
  ];

  for (const field of forbiddenFields) {
    if (field in data) {
      throw new Error(`${field} cannot be updated`);
    }
  }
}

export function ensureValidDimensions(dimensions) {
  if (!dimensions) return;

  if (typeof dimensions !== "object") {
    throw new Error("Dimensions must be an object");
  }

  const { length, width, height } = dimensions;

  if (typeof length !== "number" || length <= 0) {
    throw new Error("Length must be a positive number");
  }

  if (typeof width !== "number" || width <= 0) {
    throw new Error("Width must be a positive number");
  }

  if (typeof height !== "number" || height <= 0) {
    throw new Error("Height must be a positive number");
  }
}

export function ensureRequiredFields(data) {
  if (
    !data.name ||
    !data.price ||
    !data.establishment_id ||
    !data.category_id
  ) {
    throw new Error(
      "Name, price, establishment_id and category_id are required",
    );
  }
}
