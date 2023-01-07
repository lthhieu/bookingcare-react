export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage1', menus: [
            {
                name: 'menu.admin.manage1-details.detail1', link: '/system/manage-users'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' }
                // ]
            },
            {
                name: 'menu.admin.manage1-details.detail2', link: '/system/manage-users-redux'
            },
            {
                name: 'menu.admin.manage1-details.detail3', link: '/system/manage-admins'
            },
            {
                name: 'menu.admin.manage1-details.detail4', link: '/system/manage-doctors'
            }
        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.manage2', menus: [
            {
                name: 'menu.admin.manage2-details.detail1', link: '/system/manage-specialties'
            }
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.manage3', menus: [
            {
                name: 'menu.admin.manage3-details.detail1', link: '/system/manage-clinics'
            }
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.manage4', menus: [
            {
                name: 'menu.admin.manage4-details.detail1', link: '/system/manage-handbooks'
            }
        ]
    }
];