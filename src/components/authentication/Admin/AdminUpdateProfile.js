import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
/* import { useAuth } from "../../../contexts/AuthContext" */
import { Link } from "react-router-dom"
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase'

export default function UpdateProfile() {
  const [userID, setUID] = useState();
  const [confirm, setConfirm] = useState();
  const [modRef, setmodRef] = useState(false);
  const emailRef = useRef()
  const shipperRef = useRef()
  /* const { currentUser, updatePassword, updateEmail, updateProfile } = useAuth() */
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  /* useEffect(() => {
    getUID()
  }, []) */

  function handleSubmit(e) {
    e.preventDefault()

    function getUID() {
      const docRef = query(collection(db, "users"), where("Email", "==", emailRef.current.value));
      getDocs(docRef).then((UID) => {
        const UIDArray = [];
        UID.docs.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          UIDArray.push({ ...doc.data(), id: doc.id })

        })
        setUID(UIDArray);
      })
    }
    getUID()
    /* funtion phải có lỗi setUID(UIDArray), phải click update 2 lần mới đổi userID được*/
    const promises = []
    setLoading(true)
    setError("")
    if (!userID) {
      setConfirm("CLICK UPDATE AGAIN TO CONFIRM")
    } else {
      setConfirm("Updated")
      console.log(userID)
      console.log(userID[0].id)
      console.log(modRef)
      if (modRef) {
        const user = doc(db, `users`, userID[0].id)
        promises.push(updateDoc(user, {
          roles: ["mod"]
        }))
      }
      setTimeout(() => {
        window.location.reload(false);
      }, 1000)
    }

    /* if (adminRef.current.value) {
      promises.push(updateDoc(doc(db, `users`, currentUser.uid), {
        roles: [adminRef.current.value]
      }))
    } */

    Promise.all(promises)
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {confirm && <><div className='success-msg'>{confirm}</div><br></br></>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="Email of account that you want to chage role !"
              />
            </Form.Group>
            {['checkbox'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check /* coi lại sau */
                  inline
                  disabled
                  type={type}
                  id="admin"
                  label="admin"
                />
                <Form.Check
                  inline
                  type={type}
                  label="mod"
                  id="mod"
                  onChange={(e) => {
                    setmodRef(e.currentTarget.checked)
                  }}
                />
                <Form.Check /* coi lại sau */
                  inline
                  disabled
                  type={type}
                  label="shipper"
                  id="shipper"
                  ref={shipperRef}
                />
              </div>
            ))}
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </>
  )
}
