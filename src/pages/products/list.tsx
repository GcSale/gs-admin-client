import {observer} from "mobx-react";
import React, {useContext, useEffect} from "react";
import {WebAppContext} from "../../AppContext";
import {Link, useHistory, useLocation} from "react-router-dom";
import {Button, Form, Icon, Input, Menu, Table} from "semantic-ui-react";
import {Trans} from "@lingui/macro"
import queryString, {ParsedQuery} from 'query-string';
import {buildQueryString} from "../../utils/http";

const ProductsListPage = observer(() => {
    const {productsListStore} = useContext(WebAppContext)
    const history = useHistory()
    const location = useLocation()

    function parseQuery(query: ParsedQuery): { name?: string, pageSize?: number, page?: number } {
        const obj: { name?: string, pageSize?: number, page?: number } = {}
        if (query.page) {
            obj.page = +query.page
        }
        if (query.pageSize) {
            obj.pageSize = +query.pageSize
        }
        if (query.name) {
            if (Array.isArray(query.name)) {
                obj.name = query.name[0]
            } else {
                obj.name = query.name
            }
        }
        return obj
    }


    useEffect(() => {
        const query = queryString.parse(location.search)
        const params = parseQuery(query)
        productsListStore.updatePageData(params)
        productsListStore.fetchProducts()
    }, [productsListStore, location.search])

    return <div>
        <Form>
            <Input value={productsListStore.searchName}
                   onChange={(e) => {
                       productsListStore.searchName = e.target.value
                   }}
                   focus={true}
                   icon='search'
            >
                <input/>
                <Button type="submit"
                        onClick={() => {
                            history.push(`/products?${buildQueryString({
                                ...productsListStore.pageRequest,
                                page: 0
                            })}`)}
                        }><Trans>Search</Trans></Button>
            </Input>

        </Form>
        <Table celled>

            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Product name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {productsListStore.products.map((p, idx) => {
                    return <Table.Row key={p.uuid}>
                        <Table.Cell>{idx + 1}</Table.Cell>
                        <Table.Cell>
                            <Link to={`/products/${p.uuid}`}>{p.name}</Link>
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell>
                        <Button>
                            <Link to="/products/new"><Trans>New product</Trans></Link>
                        </Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            {productsListStore.hasPrevPage ?
                                <Menu.Item as={Link} icon
                                           to={{
                                               pathname: "/products",
                                               search: buildQueryString({
                                                   ...productsListStore.pageRequest,
                                                   page: 0
                                               })
                                           }}>
                                    <Icon name='chevron left'/>
                                </Menu.Item> : null
                            }
                            {productsListStore.pages.map(p => {
                                return <Menu.Item as={Link} key={p}
                                                  to={{
                                                      pathname: "/products",
                                                      search: buildQueryString({
                                                          ...productsListStore.pageRequest,
                                                          page: p
                                                      })
                                                  }}
                                >{p + 1}</Menu.Item>
                            })}
                            {productsListStore.hasNextPage ?
                                <Menu.Item as={Link} icon
                                           to={{
                                               pathname: "/products",
                                               search: buildQueryString({
                                                   ...productsListStore.pageRequest,
                                                   page: productsListStore.totalPages - 1
                                               })
                                           }}>
                                    <Icon name='chevron right'/>
                                </Menu.Item> : null
                            }
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    </div>
})

export default ProductsListPage