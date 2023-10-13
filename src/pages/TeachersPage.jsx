import {
  Badge,
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import axioss from "../server";
import { Link } from "react-router-dom";

const TeachersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [requestAdd, setRequestAdd] = useState(false);

  useEffect(() => {
    getTheData();
  }, []);

  const getTheData = async () => {
    try {
      setLoading(true);
      let { data } = await axioss.get("teachers");
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      setRequestAdd(true);
      let values = await form.validateFields();
      setIsModalOpen(false);
      console.log(values);

      if (selected === null) {
        await axioss.post("teachers", values);
      } else {
        await axioss.put(`teachers/${selected}`, values);
      }

      getTheData();
    } catch (err) {
      console.log(err);
    } finally {
      setRequestAdd(false);
    }
  };

  const showModal = () => {
    form.resetFields();
    setSelected(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editTeacher = async (id) => {
    try {
      setSelected(id);
      setIsModalOpen(true);

      let { data } = await axioss.get(`teachers/${id}`);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      let confirmm = confirm(
        `Are you sure you want to delete this teachers data?`
      );
      if (confirmm) {
        await axioss.delete(`teachers/${id}`);
      }
      getTheData();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => {
        return (
          <Image
            className="api-data-img"
            src={avatar}
            alt="avatar"
            style={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Is Married",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (isMarried) => {
        return isMarried ? "Yes" : "No";
      },
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (data) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editTeacher(data)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteTeacher(data)}>
            Delete
          </Button>
          <Link
            className="see-students"
            style={{ marginLeft: "10px" }}
            to={`/students:${data}`}
          >
            ...See Students
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="teachers-page">
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>
              Teachers
              <Badge
                count={data.length}
                style={{ marginLeft: "10px", backgroundColor: "gray" }}
              ></Badge>
            </h1>
            <Button onClick={showModal}>Add Teachers</Button>
          </Flex>
        )}
        loading={loading}
        dataSource={data}
        columns={columns}
      />
      ;
      <Modal
        confirmLoading={requestAdd}
        title="Teachers Data"
        open={isModalOpen}
        onOk={handleOk}
        okText={selected === null ? "Add Teacher" : "Update"}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          className="teacher-page-form"
          autoComplete="off"
          name="teachers"
          initialValues={{ isMarried: false }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          // style={{
          //   maxWidth: 600,
          // }}
        >
          <Form.Item
            className="form-item"
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input teacher's first name!",
              },
            ]}
          >
            <Input className="form-input" type="text" />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input teacher's last name!",
              },
            ]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input teacher's image!",
              },
            ]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="isMarried"
            valuePropName="checked"
            wrapperCol={{
              span: 16,
            }}
          >
            <Checkbox>Are They married?</Checkbox>
          </Form.Item>

          {/* <Form.Item
            className="form-item"
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              83e
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default TeachersPage;

// teachers end
