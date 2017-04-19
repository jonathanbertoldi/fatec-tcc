export default function getAuthenticatedHeader() {
    return new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('adminToken')
    });
}