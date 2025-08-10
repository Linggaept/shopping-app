import AddCategoriesDialog from "@/components/admin/add-categories";
import CategoriesTable from "@/components/admin/categories-table";
import Container from "@/components/container";

const CategoriesManage = () => {
  return (
    <>
      <Container className="py-10">
        <h1 className="text-2xl font-bold">Categories Management</h1>

        <p className="text-gray-600 mb-4">
          Here you can manage your categories, including adding, editing, and
          deleting categories.
        </p>

        <AddCategoriesDialog />
        <CategoriesTable />
      </Container>
    </>
  );
};

export default CategoriesManage;
