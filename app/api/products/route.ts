import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const data = fs.readFileSync(filePath, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ message: "Error reading products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    const filePath = path.join(process.cwd(), "data", "products.json");
    let products = [];

    if (fs.existsSync(filePath)) {
      products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    const product = { ...newProduct, id: `PROD-${Date.now()}` };
    products.push(product);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ message: "Product added successfully", product });
  } catch (error) {
    return NextResponse.json({ message: "Error adding product" }, { status: 500 });
  }
}
