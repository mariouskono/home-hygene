import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const filePath = path.join(process.cwd(), "data", "employees.json");
    
    if (!fs.existsSync(filePath)) return NextResponse.json({ message: "Database not found" }, { status: 404 });
    
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = data.findIndex((d: any) => d.id === id);
    
    if (index === -1) return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    
    data[index] = { ...data[index], ...body };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ message: "Employee updated successfully", employee: data[index] });
  } catch (error) {
    return NextResponse.json({ message: "Error updating employee" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), "data", "employees.json");
    
    if (!fs.existsSync(filePath)) return NextResponse.json({ message: "Database not found" }, { status: 404 });
    
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const filtered = data.filter((d: any) => d.id !== id);
    
    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting employee" }, { status: 500 });
  }
}
