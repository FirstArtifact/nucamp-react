import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

const minLength = (len) => (val) => val && val.length >= len;
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isModalOpen: false,
      rating: "",
      name: "",
      comment: "",
      isDropDownOpen: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
    console.log(this.state.isModalOpen);
  }

  handleSubmit(values) {
      debugger;
    this.toggleModal();
    this.props.addComment(this.props.campsiteId, values.rating, values.name, values.comment);
}
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggleModal} outline color="secondary">
          <i className="fa fa-pencil">Submit Comment</i>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Label htmlFor="rating">Rating</Label>
              <Row className="formgroup">
                <Col md={12}>
                  <Control.select
                    className="col-md-12"
                    model=".rating"
                    id="rating"
                    name="rating"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>

              <Label htmlFor="name">Your Name</Label>
              <Row className="formgroup">
                <Col md={12}>
                  <Control.text
                    className="col-md-12"
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".name"
                    component="div"
                    messages={{
                      minLength: "Must be atleast 2 characters long",
                      maxLength: `Name can't be more than 15 characters long`,
                    }}
                  />
                </Col>
              </Row>

              <Label htmlFor="comment">Comment</Label>
              <Row className="formgroup">
                <Col md={12}>
                  <Control.textarea
                    style={{ height: "150px" }}
                    className="col-md-12"
                    model=".comment"
                    id="comment"
                    name="comment"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 12, offset: 0 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comments) => {
          return (
            <div key={comments.id}>
              <Card>
                <CardBody>
                  <CardText>{comments.text}</CardText>
                  <CardText>
                    --{comments.author}{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comments.date)))}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          );
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  } else {
    return <div> </div>;
  }
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
