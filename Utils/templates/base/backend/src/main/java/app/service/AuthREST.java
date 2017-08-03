package <%= package.lower %>.<%= project.lower %>.service;


import io.swagger.annotations.Api;
import <%= package.lower %>.<%= project.lower %>.dao.UserDAO;
import import java.util.logging.Logger;
import static java.util.logging.Logger.getLogger;
<%= package.lower %>.<%= project.lower %>.security.Credentials;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.Context;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import javax.ws.rs.core.Response;
import static javax.ws.rs.core.Response.ok;
import org.demoiselle.jee.security.annotation.Authenticated;
import pgxp.app.constants.Social;
import pgxp.app.dao.MenuDAO;
import pgxp.app.dao.UsuarioDAO;
import pgxp.app.security.Credentials;

@Api("Auth")
@Path("auth")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
public class AuthREST {

    private static final Logger LOG = getLogger(AuthREST.class.getName());

    @Inject
    private UsuarioDAO dao;

    @Inject
    private MenuDAO menudao;

    /**
     *
     * @param credentials
     * @param request
     * @return
     */
    @POST
    @Transactional
    public Response login(Credentials credentials, @Context HttpServletRequest request) {
        return ok().entity(dao.login(credentials, request.getRemoteAddr()).toString()).build();
    }

    /**
     *
     * @param asyncResponse
     */
    @GET
    @Authenticated
    public void retoken(@Suspended final AsyncResponse asyncResponse) {
        asyncResponse.resume(doRetoken());
    }

    private Response doRetoken() {
        return ok().entity(dao.retoken().toString()).build();
    }

    /**
     *
     * @param asyncResponse
     */
    @GET
    @Path("menu")
    @Authenticated
    public void menu(@Suspended final AsyncResponse asyncResponse) {
        asyncResponse.resume(doMenu());
    }

    private Response doMenu() {
        return ok().entity(menudao.select()).build();
    }

    /**
     *
     * @param credentials
     * @return
     */
    @POST
    @Transactional
    @Path("change")
    public Response resenha(Credentials credentials) {
        return ok().entity(dao.resenha(credentials)).build();
    }

    /**
     *
     * @param credentials
     * @return
     */
    @POST
    @Transactional
    @Path("aminesia")
    public Response aminesia(Credentials credentials) {
        return ok().entity(dao.aminesia(credentials)).build();
    }

        /**
     *
     * @param social
     * @return
     */
    @POST
    @Transactional
    @Path("social")
    public Response social(Social social) {
        return ok().entity(dao.social(social).toString()).build();
    }

}
